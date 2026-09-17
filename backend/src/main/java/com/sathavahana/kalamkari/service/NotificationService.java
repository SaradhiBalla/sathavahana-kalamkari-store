package com.sathavahana.kalamkari.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sathavahana.kalamkari.domain.User;
import com.sathavahana.kalamkari.dto.FeatureDtos;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.*;

@Service
public class NotificationService {
    private final JdbcTemplate db;
    private final ObjectMapper json = new ObjectMapper();
    public NotificationService(JdbcTemplate db) { this.db = db; }

    public void preference(User u, FeatureDtos.PreferenceRequest r) {
        db.update("INSERT INTO notification_preferences(user_id,channel,event_type,enabled) VALUES(?,?,?,?) " +
                "ON CONFLICT(user_id,channel,event_type) DO UPDATE SET enabled=EXCLUDED.enabled",
                u.getId(), r.channel().toUpperCase(Locale.ROOT), r.eventType(), r.enabled());
    }
    public void subscribe(User u, FeatureDtos.BackInStockRequest r) {
        String email = r.email() == null || r.email().isBlank() ? u.getEmail() : r.email();
        if (db.queryForObject("SELECT COUNT(*) FROM products WHERE id=?", Integer.class, r.productId()) == 0)
            throw new NotFoundException("Product not found");
        db.update("INSERT INTO back_in_stock_subscriptions(product_id,user_id,email) VALUES(?,?,?) ON CONFLICT(product_id,email) DO NOTHING",
                r.productId(), u.getId(), email);
    }
    public void view(User u, FeatureDtos.ViewRequest r) {
        db.update("INSERT INTO recently_viewed_products(user_id,visitor_token,product_id) VALUES(?,?,?)",
                u == null ? null : u.getId(), r.visitorToken(), r.productId());
        db.update("INSERT INTO analytics_events(user_id,visitor_token,event_type,product_id) VALUES(?,?,?,?)",
                u == null ? null : u.getId(), r.visitorToken(), "PRODUCT_VIEW", r.productId());
    }
    public void event(User u, FeatureDtos.AnalyticsRequest r) {
        try {
            db.update("INSERT INTO analytics_events(user_id,visitor_token,event_type,product_id,query_text,metadata) VALUES(?,?,?,?,?,?)",
                    u == null ? null : u.getId(), r.visitorToken(), r.eventType(), r.productId(), r.queryText(),
                    r.metadata() == null ? null : json.writeValueAsString(r.metadata()));
        } catch (JsonProcessingException e) { throw new IllegalArgumentException("Invalid analytics metadata"); }
    }
    public void inApp(User u, FeatureDtos.NotificationRequest r) {
        db.update("INSERT INTO in_app_notifications(user_id,event_type,title,body) VALUES(?,?,?,?)",
                u.getId(), r.eventType(), r.title(), r.body());
    }
    public void publish(User u, String type, String aggregateType, Long aggregateId, String payload,
                        String recipient, String subject) {
        Long eventId = db.queryForObject("INSERT INTO notification_events(event_type,aggregate_type,aggregate_id,user_id,payload) "
                + "VALUES(?,?,?,?,?) RETURNING id", Long.class, type, aggregateType, aggregateId,
                u == null ? null : u.getId(), payload);
        if (recipient != null) db.update("INSERT INTO email_delivery_logs(event_id,recipient,subject,provider,status,error_message) "
                + "VALUES(?,?,?,'development','SKIPPED_DEVELOPMENT','External email delivery is disabled')",
                eventId, recipient, subject == null ? type : subject);
    }
    public List<Map<String,Object>> notifications(User u, boolean unread) {
        return db.queryForList("SELECT id,event_type,title,body,read_at,created_at FROM in_app_notifications WHERE user_id=? "
                + (unread ? "AND read_at IS NULL " : "") + "ORDER BY created_at DESC LIMIT 100", u.getId());
    }
    public List<Map<String,Object>> recent(User u, String visitor) {
        return db.queryForList("SELECT p.id,p.slug,p.name,p.price,r.viewed_at FROM recently_viewed_products r JOIN products p ON p.id=r.product_id "
                + "WHERE " + (u == null ? "r.visitor_token=?" : "r.user_id=?") + " ORDER BY r.viewed_at DESC LIMIT 20",
                u == null ? visitor : u.getId());
    }
    @Scheduled(fixedDelayString="${app.notifications.abandoned-cart-delay-ms:3600000}")
    public void detectAbandonedCarts() {
        db.update("INSERT INTO abandoned_carts(cart_id,user_id) SELECT c.id,c.user_id FROM carts c LEFT JOIN abandoned_carts a ON a.cart_id=c.id "
                + "WHERE c.updated_at < ? AND a.id IS NULL",
                java.sql.Timestamp.from(java.time.Instant.now().minusSeconds(3600)));
    }
    @Scheduled(cron="${app.analytics.aggregate-cron:0 15 0 * * *}")
    public void aggregateAnalytics() {
        db.update("INSERT INTO analytics_daily_aggregates(metric_date,event_type,product_id,event_count) "
                + "SELECT CAST(occurred_at AS DATE),event_type,product_id,COUNT(*) FROM analytics_events "
                + "WHERE occurred_at >= CURRENT_DATE - 2 GROUP BY CAST(occurred_at AS DATE),event_type,product_id "
                + "ON CONFLICT(metric_date,event_type,product_id) DO UPDATE SET event_count=EXCLUDED.event_count");
    }
}
