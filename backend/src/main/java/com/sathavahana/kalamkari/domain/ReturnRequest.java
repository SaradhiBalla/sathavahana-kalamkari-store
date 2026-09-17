package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="returns") public class ReturnRequest { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @OneToOne @JoinColumn(name="order_id") Order order; @ManyToOne User user; String reason; String status="REQUESTED"; Instant createdAt=Instant.now(); public ReturnRequest(){} public ReturnRequest(Order o,User u,String r){order=o;user=u;reason=r;} public String getStatus(){return status;} }
