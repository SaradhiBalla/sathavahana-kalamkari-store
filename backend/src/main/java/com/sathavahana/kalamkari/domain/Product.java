package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*; import java.math.BigDecimal; import java.time.Instant;
@Entity @Table(name="products")
public class Product {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @Column(nullable=false,unique=true) private String slug;
 @Column(nullable=false) private String name; private String description; @Column(nullable=false) private BigDecimal price;
 @Column(name="stock_quantity",nullable=false) private int stockQuantity; @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="category_id") private Category category;
 @Column(name="image_url") private String imageUrl; @Column(nullable=false) private boolean active=true; @Column(name="created_at") private Instant createdAt=Instant.now(); @Column(name="updated_at") private Instant updatedAt=Instant.now();
 public Product(){} public Product(String slug,String name,BigDecimal price,Category category){this.slug=slug;this.name=name;this.price=price;this.category=category;}
 public Long getId(){return id;} public String getSlug(){return slug;} public void setSlug(String v){slug=v;} public String getName(){return name;} public void setName(String v){name=v;}
 public String getDescription(){return description;} public void setDescription(String v){description=v;} public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal v){price=v;}
 public int getStockQuantity(){return stockQuantity;} public void setStockQuantity(int v){stockQuantity=v;} public Category getCategory(){return category;} public void setCategory(Category v){category=v;}
 public String getImageUrl(){return imageUrl;} public void setImageUrl(String v){imageUrl=v;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
}
