package com.sathavahana.kalamkari.controller;

import com.sathavahana.kalamkari.dto.AdminDto.*;
import com.sathavahana.kalamkari.service.*;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController @RequestMapping("/api/v1/admin")
public class AdminController {
 private final CurrentUser current; private final RbacService rbac; private final AdminOperationsService ops;
 public AdminController(CurrentUser c,RbacService r,AdminOperationsService o){current=c;rbac=r;ops=o;}
 private void auth(){rbac.requireAdmin(current.require().getId());}
 private void auth(String permission){rbac.requirePermission(current.require().getId(), permission);}
 @GetMapping("/permissions") public Set<String> permissions(){auth();return rbac.permissions(current.require().getId());}
 @GetMapping("/dashboard") public Dashboard dashboard(){auth("DASHBOARD_VIEW");return ops.dashboard();}
 @GetMapping("/products") public Page<ProductView> products(@RequestParam(defaultValue="") String q,@PageableDefault(size=20) Pageable p){auth("PRODUCT_VIEW");return ops.productSearch(q,p);}
 @PostMapping("/products") public ProductView create(@RequestBody ProductInput x){auth("PRODUCT_CREATE");return ops.createProduct(x);}
 @PutMapping("/products/{id}") public ProductView update(@PathVariable Long id,@RequestBody ProductInput x){auth("PRODUCT_UPDATE");return ops.updateProduct(id,x);}
 @DeleteMapping("/products/{id}") public void archiveProduct(@PathVariable Long id){auth("PRODUCT_DELETE");ops.deleteProduct(id);}
 @PatchMapping("/products/{id}/status") public ProductView statusProduct(@PathVariable Long id,@RequestParam boolean active){auth();return ops.updateProduct(id,new ProductInput(null,null,null,null,null,null,null,active));}
 @GetMapping("/categories") public List<CategoryView> categories(){auth("CATEGORY_VIEW");return ops.categoryList();}
 @PostMapping("/categories") public CategoryView createCategory(@RequestBody CategoryInput x){auth("CATEGORY_CREATE");return ops.createCategory(x);}
 @PutMapping("/categories/{id}") public CategoryView updateCategory(@PathVariable Long id,@RequestBody CategoryInput x){auth("CATEGORY_UPDATE");return ops.updateCategory(id,x);}
 @PostMapping("/categories/{id}/archive") public void archiveCategory(@PathVariable Long id){auth("CATEGORY_DELETE");ops.archiveCategory(id);}
 @GetMapping("/inventory") public List<InventoryTransaction> inventory(){auth("INVENTORY_VIEW");return ops.inventory();}
 @PostMapping("/inventory/{productId}/adjust") public InventoryTransaction adjust(@PathVariable Long productId,@RequestBody InventoryAdjustment x){auth("INVENTORY_UPDATE");return ops.adjust(productId,x);}
 @GetMapping("/customers") public Page<CustomerView> customers(@RequestParam(defaultValue="") String q,@PageableDefault(size=20) Pageable p){auth("CUSTOMER_VIEW");return ops.customers(q,p);}
 @GetMapping("/customers/{id}") public CustomerView customer(@PathVariable Long id){auth("CUSTOMER_VIEW");return ops.customer(id);}
 @PatchMapping("/customers/{id}/status") public CustomerView customerStatus(@PathVariable Long id,@RequestBody StatusChange x){auth("CUSTOMER_UPDATE");return ops.customerStatus(id,x);}
 @GetMapping("/orders") public Page<OrderView> orders(@PageableDefault(size=20) Pageable p){auth("ORDER_VIEW");return ops.orderList(p);}
 @GetMapping("/orders/{id}") public OrderView order(@PathVariable Long id){auth("ORDER_VIEW");return ops.order(id);}
 @PatchMapping("/orders/{id}/status") public OrderView orderStatus(@PathVariable Long id,@RequestBody StatusChange x){auth("ORDER_UPDATE");return ops.orderStatus(id,x);}
 @GetMapping("/orders/{id}/history") public List<OrderHistory> history(@PathVariable Long id){auth();return ops.orderHistory(id);}
 @GetMapping("/audit-logs") public List<AuditView> audit(@PageableDefault(size=50) Pageable p){auth("AUDIT_VIEW");return ops.audits(p);}
 @GetMapping("/reports") public Report report(@RequestParam(required=false) String period){auth("REPORT_VIEW");return ops.report(period);}
 @GetMapping("/settings") public List<SettingView> settings(){auth("SETTINGS_VIEW");return ops.settings();}
 @PutMapping("/settings/{key}") public SettingView setting(@PathVariable String key,@RequestBody SettingInput x){auth("SETTINGS_UPDATE");return ops.setting(key,x);}
}
