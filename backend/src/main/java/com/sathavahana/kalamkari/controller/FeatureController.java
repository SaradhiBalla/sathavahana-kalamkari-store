package com.sathavahana.kalamkari.controller;

import com.sathavahana.kalamkari.domain.User;
import com.sathavahana.kalamkari.dto.FeatureDtos;
import com.sathavahana.kalamkari.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.*;
import java.security.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class FeatureController {
    private final NotificationService features; private final CurrentUser current; private final JdbcTemplate db;
    private final Path mediaRoot;
    public FeatureController(NotificationService f, CurrentUser c, JdbcTemplate db,
                             @Value("${app.media.local-path:uploads}") String root) {
        features=f; current=c; this.db=db; mediaRoot=Paths.get(root).toAbsolutePath().normalize();
    }
    private User optionalUser() { try { return current.require(); } catch (UnauthorizedException e) { return null; } }

    @PostMapping("/me/notification-preferences")
    public void preference(@Valid @RequestBody FeatureDtos.PreferenceRequest r) { features.preference(current.require(), r); }
    @PostMapping("/me/back-in-stock")
    public void backStock(@Valid @RequestBody FeatureDtos.BackInStockRequest r) { features.subscribe(current.require(), r); }
    @GetMapping("/me/notifications")
    public List<Map<String,Object>> notifications(@RequestParam(defaultValue="false") boolean unread) { return features.notifications(current.require(), unread); }
    @PostMapping("/me/notifications")
    public void notification(@Valid @RequestBody FeatureDtos.NotificationRequest r) { features.inApp(current.require(), r); }
    @PostMapping("/notifications/events")
    public ResponseEntity<Void> publish(@RequestBody Map<String,Object> r) {
        User u=optionalUser(); String type=Objects.toString(r.get("eventType"),"GENERAL");
        features.publish(u,type,Objects.toString(r.get("aggregateType"),null),
                r.get("aggregateId") instanceof Number n ? n.longValue() : null,
                Objects.toString(r.getOrDefault("payload","{}"),"{}"),
                Objects.toString(r.get("recipient"),null),Objects.toString(r.get("subject"),type));
        return ResponseEntity.accepted().build();
    }
    @PostMapping("/analytics/events")
    public ResponseEntity<Void> analytics(@Valid @RequestBody FeatureDtos.AnalyticsRequest r) { features.event(optionalUser(), r); return ResponseEntity.accepted().build(); }
    @PostMapping("/products/{id}/view")
    public ResponseEntity<Void> view(@PathVariable Long id, @RequestParam(required=false) String visitorToken) {
        features.view(optionalUser(), new FeatureDtos.ViewRequest(id, visitorToken)); return ResponseEntity.accepted().build();
    }
    @GetMapping("/products/recently-viewed")
    public List<Map<String,Object>> recent(@RequestParam(required=false) String visitorToken) { return features.recent(optionalUser(), visitorToken); }
    @GetMapping("/products/{id}/related")
    public List<Map<String,Object>> related(@PathVariable Long id, @RequestParam(defaultValue="8") int limit) {
        int n=Math.max(1, Math.min(limit, 30));
        return db.queryForList("SELECT p.id,p.slug,p.name,p.price,p.image_url FROM products p WHERE p.active=true AND p.id<>? "
                + "AND p.category_id=(SELECT category_id FROM products WHERE id=?) ORDER BY p.id LIMIT " + n, id,id);
    }
    @GetMapping("/products/recommendations")
    public List<Map<String,Object>> recommendations(@RequestParam(defaultValue="8") int limit) {
        User u=optionalUser(); int n=Math.max(1,Math.min(limit,30));
        if (u==null) return db.queryForList("SELECT id,slug,name,price,image_url FROM products WHERE active=true ORDER BY created_at DESC LIMIT "+n);
        return db.queryForList("SELECT p.id,p.slug,p.name,p.price,p.image_url FROM products p JOIN recently_viewed_products r ON r.product_id=p.id "
                + "WHERE r.user_id=? GROUP BY p.id,p.slug,p.name,p.price,p.image_url ORDER BY MAX(r.viewed_at) DESC LIMIT "+n,u.getId());
    }
    @GetMapping("/products/search")
    public List<Map<String,Object>> search(@RequestParam String q, @RequestParam(defaultValue="20") int limit) {
        if (q.isBlank()) return List.of(); int n=Math.max(1,Math.min(limit,50)); String like="%"+q.trim()+"%";
        features.event(optionalUser(), new FeatureDtos.AnalyticsRequest("SEARCH",null,q,null,null));
        return db.queryForList("SELECT id,slug,name,description,price,image_url FROM products WHERE active=true AND (LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)) ORDER BY name LIMIT "+n,like,like);
    }
    @PostMapping(value="/admin/media", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String,Object> upload(@RequestPart MultipartFile file) throws Exception {
        if (file.isEmpty() || file.getSize()>10_000_000) throw new IllegalArgumentException("File must be between 1 byte and 10 MB");
        String type=Optional.ofNullable(file.getContentType()).orElse("");
        if (!Set.of("image/jpeg","image/png","image/webp","image/svg+xml").contains(type)) throw new IllegalArgumentException("Unsupported media type");
        Files.createDirectories(mediaRoot); String ext=type.substring(type.indexOf('/')+1).replace("svg+xml","svg");
        String key=UUID.randomUUID()+"."+ext; Path target=mediaRoot.resolve(key).normalize();
        if (!target.getParent().equals(mediaRoot)) throw new IllegalArgumentException("Invalid media key");
        Files.copy(file.getInputStream(),target,StandardCopyOption.REPLACE_EXISTING);
        String hash=sha256(target);
        Number id=db.queryForObject("INSERT INTO media_assets(object_key,original_name,content_type,size_bytes,sha256,storage_provider) VALUES(?,?,?,?,?,'local') RETURNING id",
                Number.class,key,Objects.requireNonNullElse(file.getOriginalFilename(),"upload"),type,file.getSize(),hash);
        return Map.of("id",id,"key",key,"contentType",type,"size",file.getSize(),"sha256",hash);
    }
    @GetMapping("/admin/media/{key}")
    public ResponseEntity<Resource> media(@PathVariable String key) {
        Path p=mediaRoot.resolve(key).normalize(); if (!p.startsWith(mediaRoot) || !Files.exists(p)) throw new NotFoundException("Media not found");
        try { return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(p))).body(new FileSystemResource(p)); }
        catch(IOException e){ throw new IllegalArgumentException("Unable to read media"); }
    }
    @GetMapping(value="/admin/analytics/export", produces="text/csv")
    public ResponseEntity<byte[]> export(@RequestParam(defaultValue="30") int days) {
        current.require(); StringBuilder out=new StringBuilder("date,eventType,productId,count\n");
        db.query("SELECT CAST(occurred_at AS DATE),event_type,product_id,COUNT(*) FROM analytics_events WHERE occurred_at>=CURRENT_DATE-? GROUP BY CAST(occurred_at AS DATE),event_type,product_id ORDER BY 1", 
                rs->{while(rs.next()) out.append(rs.getDate(1)).append(',').append(rs.getString(2)).append(',').append(rs.getObject(3)==null?"":rs.getObject(3)).append(',').append(rs.getLong(4)).append('\n');});
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=analytics-"+LocalDate.now()+".csv").body(out.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8));
    }
    @GetMapping("/admin/analytics")
    public List<Map<String,Object>> analytics(@RequestParam(defaultValue="30") int days) {
        current.require(); int n=Math.max(1,Math.min(days,365));
        return db.queryForList("SELECT CAST(occurred_at AS DATE) metric_date,event_type,product_id,COUNT(*) event_count "
                + "FROM analytics_events WHERE occurred_at>=CURRENT_DATE-? GROUP BY CAST(occurred_at AS DATE),event_type,product_id ORDER BY metric_date DESC",n);
    }
    private String sha256(Path p) throws Exception { MessageDigest md=MessageDigest.getInstance("SHA-256"); try(InputStream in=Files.newInputStream(p)){byte[] b=new byte[8192];int n;while((n=in.read(b))>0)md.update(b,0,n);} StringBuilder s=new StringBuilder();for(byte b:md.digest())s.append(String.format("%02x",b));return s.toString(); }
}
