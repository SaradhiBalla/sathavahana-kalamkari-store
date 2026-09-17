package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="shipments") public class Shipment { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @OneToOne @JoinColumn(name="order_id") Order order; String carrier,trackingNumber; String status="PENDING"; Instant shippedAt,deliveredAt; public Shipment(){} public Shipment(Order o){order=o;} public String getStatus(){return status;} }
