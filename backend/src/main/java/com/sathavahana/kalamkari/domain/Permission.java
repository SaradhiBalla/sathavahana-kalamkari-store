package com.sathavahana.kalamkari.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "permissions")
public class Permission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true) private String name;
    protected Permission() {}
    public String getName() { return name; }
}
