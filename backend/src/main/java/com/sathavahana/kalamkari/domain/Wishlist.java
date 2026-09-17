package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="wishlists") public class Wishlist { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @ManyToOne(fetch=FetchType.LAZY) private User user; @ManyToOne(fetch=FetchType.LAZY) private Product product; @Column(name="created_at") private Instant createdAt=Instant.now(); public Wishlist(){} public Wishlist(User u,Product p){user=u;product=p;} public Product getProduct(){return product;} }
