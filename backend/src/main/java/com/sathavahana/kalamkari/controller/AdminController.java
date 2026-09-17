package com.sathavahana.kalamkari.controller;

import com.sathavahana.kalamkari.service.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final CurrentUser currentUser; private final RbacService rbac;
    public AdminController(CurrentUser currentUser, RbacService rbac){this.currentUser=currentUser;this.rbac=rbac;}
    @GetMapping("/permissions")
    public java.util.Set<String> permissions(){var u=currentUser.require();rbac.requireAdmin(u.getId());return rbac.permissions(u.getId());}
}
