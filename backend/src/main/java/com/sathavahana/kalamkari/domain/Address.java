package com.sathavahana.kalamkari.domain;
import jakarta.persistence.*; import java.time.Instant;
@Entity @Table(name="addresses") public class Address { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id") private User user; @Column(name="recipient_name") private String recipientName; private String line1,line2,city,state; @Column(name="postal_code") private String postalCode; private String country="India",phone; @Column(name="created_at") private Instant createdAt=Instant.now(); public Address(){} }
