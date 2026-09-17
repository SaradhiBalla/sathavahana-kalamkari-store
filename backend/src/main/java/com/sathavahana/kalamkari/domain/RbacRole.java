package com.sathavahana.kalamkari.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class RbacRole {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true) private String name;
    protected RbacRole() {}
    public Long getId() { return id; }
    public String getName() { return name; }
}
