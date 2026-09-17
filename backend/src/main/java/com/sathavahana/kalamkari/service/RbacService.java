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
        if (!(roles.roleNames(userId).contains("ADMIN") || users.findById(userId).map(u -> u.getRole() == com.sathavahana.kalamkari.domain.User.Role.ADMIN).orElse(false))) throw new ForbiddenException("Administrator permission is required");
    }
}
