package com.sathavahana.kalamkari.service;

import com.sathavahana.kalamkari.repository.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RbacService {
    private final UserRoleRepository roles; private final UserRepository users;
    public RbacService(UserRoleRepository roles, UserRepository users) { this.roles = roles; this.users = users; }
    public Set<String> permissions(Long userId) {
        Set<String> result = new HashSet<>(roles.permissionNames(userId));
        if (roles.roleNames(userId).contains("ADMIN") || users.findById(userId).map(u -> u.getRole() == com.sathavahana.kalamkari.domain.User.Role.ADMIN).orElse(false)) result.add("*");
        return result;
    }
    public void requireAdmin(Long userId) {
        if (!(roles.roleNames(userId).contains("ADMIN") || roles.roleNames(userId).contains("SUPER_ADMIN")
                || users.findById(userId).map(u -> u.getRole() == com.sathavahana.kalamkari.domain.User.Role.ADMIN
                || u.getRole() == com.sathavahana.kalamkari.domain.User.Role.SUPER_ADMIN).orElse(false))) {
            throw new ForbiddenException("Administrator permission is required");
        }
    }

    public void requirePermission(Long userId, String permission) {
        requireAdminOrMappedRole(userId);
        if (!permissions(userId).contains("*") && !permissions(userId).contains(permission)) {
            throw new ForbiddenException("Missing permission: " + permission);
        }
    }

    private void requireAdminOrMappedRole(Long userId) {
        if (roles.roleNames(userId).isEmpty() && users.findById(userId)
                .map(u -> u.getRole() == com.sathavahana.kalamkari.domain.User.Role.CUSTOMER).orElse(true)) {
            throw new ForbiddenException("Administrator permission is required");
        }
    }
}
