package com.sathavahana.kalamkari.config;

import com.sathavahana.kalamkari.service.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminAuthorizationInterceptor implements HandlerInterceptor {
    private final CurrentUser currentUser; private final RbacService rbac;
    public AdminAuthorizationInterceptor(CurrentUser currentUser, RbacService rbac){this.currentUser=currentUser;this.rbac=rbac;}
    @Override public boolean preHandle(HttpServletRequest request,HttpServletResponse response,Object handler){
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return true;
        rbac.requireAdmin(currentUser.require().getId());
        return true;
    }
}
