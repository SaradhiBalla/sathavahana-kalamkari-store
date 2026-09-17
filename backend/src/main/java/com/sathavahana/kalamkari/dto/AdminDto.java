package com.sathavahana.kalamkari.dto;

import com.sathavahana.kalamkari.domain.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public final class AdminDto {
 private AdminDto(){}
 public record ProductInput(String slug,String name,String description,BigDecimal price,Integer stockQuantity,Long categoryId,String imageUrl,Boolean active){}
 public record ProductView(Long id,String slug,String name,String description,BigDecimal price,int stockQuantity,Long categoryId,String imageUrl,boolean active){}
 public record CategoryInput(String slug,String name,String description){}
 public record CategoryView(Long id,String slug,String name,String description,boolean archived){}
 public record InventoryAdjustment(int quantityDelta,String reason){}
 public record InventoryTransaction(Long id,Long productId,int quantityDelta,String reason,Long createdBy,Instant createdAt){}
 public record CustomerView(Long id,String email,String firstName,String lastName,String phone,User.Role role,User.Status status,Instant createdAt){}
 public record StatusChange(String status,String note){}
 public record OrderView(Long id,Long customerId,String customerEmail,Order.Status status,String paymentStatus,BigDecimal totalAmount,Instant createdAt){}
 public record OrderHistory(Long id,Long orderId,String fromStatus,String toStatus,Long changedBy,String note,Instant createdAt){}
 public record AuditView(Long id,Long actorId,String action,String resourceType,String resourceId,String details,Instant createdAt){}
 public record SettingInput(String value){}
 public record SettingView(String key,String value,Instant updatedAt){}
 public record Dashboard(long products,long activeProducts,long customers,long orders,long pendingOrders,BigDecimal revenue){}
 public record Report(String period,long orders,BigDecimal revenue,Map<String,Long> orderStatuses){}
}
