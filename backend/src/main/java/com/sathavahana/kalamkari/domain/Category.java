package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="categories")
public class Category {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true) private String slug;
 @Column(nullable=false) private String name;
 private String description;
 @Column(name="created_at",nullable=false) private Instant createdAt=Instant.now();
 public Category() {}
 public Category(String slug,String name,String description){this.slug=slug;this.name=name;this.description=description;}
 public Long getId(){return id;} public String getSlug(){return slug;} public void setSlug(String v){slug=v;}
 public String getName(){return name;} public void setName(String v){name=v;} public String getDescription(){return description;} public void setDescription(String v){description=v;}
}
