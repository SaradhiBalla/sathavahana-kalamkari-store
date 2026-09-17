package com.sathavahana.kalamkari.service;

import com.sathavahana.kalamkari.domain.User;
import com.sathavahana.kalamkari.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class CurrentUser {
    private final UserRepository users;
    private final HttpServletRequest request;
    private final AuthTokenService tokens;

    public CurrentUser(UserRepository users, HttpServletRequest request, AuthTokenService tokens) {
        this.users = users;
        this.request = request;
        this.tokens = tokens;
    }

    public User require() {
        String token = token();
        if (token == null) {
            throw new UnauthorizedException("Authentication is required");
        }
        Long id = tokens.verify(token);
        return users.findById(id).orElseThrow(() -> new UnauthorizedException("Invalid user"));
    }

    private String token() {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("kalamkari_access_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
