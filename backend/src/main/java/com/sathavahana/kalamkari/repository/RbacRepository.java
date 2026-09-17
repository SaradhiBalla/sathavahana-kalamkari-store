package com.sathavahana.kalamkari.repository;

import com.sathavahana.kalamkari.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import jakarta.persistence.*;
import java.util.*;

interface RbacRoleRepository extends JpaRepository<RbacRole, Long> {
    Optional<RbacRole> findByName(String name);
}
interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(String name);
}
@Entity @Table(name="user_roles")
class UserRoleLink {
    @EmbeddedId private UserRoleId id;
    @ManyToOne @MapsId("userId") @JoinColumn(name="user_id") User user;
    @ManyToOne @MapsId("roleId") @JoinColumn(name="role_id") RbacRole role;
}
@Embeddable class UserRoleId implements java.io.Serializable {
    Long userId;
    Long roleId;

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (!(other instanceof UserRoleId that)) return false;
        return Objects.equals(userId, that.userId) && Objects.equals(roleId, that.roleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, roleId);
    }
}
@Entity @Table(name="role_permissions")
class RolePermissionLink {
    @EmbeddedId private RolePermissionId id;
    @ManyToOne @MapsId("roleId") @JoinColumn(name="role_id") RbacRole role;
    @ManyToOne @MapsId("permissionId") @JoinColumn(name="permission_id") Permission permission;
}
@Embeddable class RolePermissionId implements java.io.Serializable {
    Long roleId;
    Long permissionId;

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (!(other instanceof RolePermissionId that)) return false;
        return Objects.equals(roleId, that.roleId) && Objects.equals(permissionId, that.permissionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, permissionId);
    }
}
