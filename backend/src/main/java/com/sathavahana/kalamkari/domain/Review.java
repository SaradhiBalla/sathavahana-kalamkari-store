package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="reviews") public class Review { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @ManyToOne Product product; @ManyToOne User user; @ManyToOne Order order; int rating; String title; @Column(columnDefinition="TEXT") String body; String status="PENDING"; Instant createdAt=Instant.now(); public Review(){} public Review(Product p,User u,Order o,int r,String t,String b){product=p;user=u;order=o;rating=r;title=t;body=b;} public String getStatus(){return status;} }
