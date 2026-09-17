package com.sathavahana.kalamkari.controller;

import com.sathavahana.kalamkari.domain.User;
import com.sathavahana.kalamkari.repository.UserRepository;
import com.sathavahana.kalamkari.service.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserRepository users; private final PasswordHasher hasher; private final AuthTokenService tokens;
    private final boolean secureCookie;
    public AuthController(UserRepository users, PasswordHasher hasher, AuthTokenService tokens,
                          @Value("${app.auth.cookie-secure:false}") boolean secureCookie) {
        this.users=users; this.hasher=hasher; this.tokens=tokens; this.secureCookie=secureCookie;
    }
    public record Register(@NotBlank @Email String email, @NotBlank @Size(min=8) String password,
                           @NotBlank @Size(max=100) String firstName, @Size(max=100) String lastName,
                           @Size(max=30) String phone) {}
    public record Login(@NotBlank @Email String email, @NotBlank String password) {}
    public record Response(Long userId, String email, String firstName, String token) {}
    @PostMapping("/register")
    public Response register(@Valid @RequestBody Register input, HttpServletResponse response) {
        String email = input.email().trim().toLowerCase();
        if (users.findByEmailIgnoreCase(email).isPresent()) throw new IllegalArgumentException("Email is already registered");
        User user = new User(); user.setEmail(email); user.setPasswordHash(hasher.hash(input.password()));
        user.setFirstName(input.firstName().trim()); user.setLastName(input.lastName()); user.setPhone(input.phone());
        user = users.save(user);
        return response(user, response);
    }
    @PostMapping("/login")
    public Response login(@Valid @RequestBody Login input, HttpServletResponse response) {
        User user = users.findByEmailIgnoreCase(input.email().trim()).filter(u -> hasher.matches(input.password(), u.getPasswordHash())).orElseThrow(() -> new UnauthorizedException("Invalid email or password"));
        return response(user, response);
    }
    @PostMapping("/logout")
    public void logout(HttpServletResponse response) {
        response.addHeader("Set-Cookie", cookie("", 0).toString());
    }
    private Response response(User u, HttpServletResponse response) {
        String token = tokens.issue(u.getId());
        response.addHeader("Set-Cookie", cookie(token, 86_400).toString());
        return new Response(u.getId(), u.getEmail(), u.getFirstName(), token);
    }
    private ResponseCookie cookie(String value, int maxAge) {
        return ResponseCookie.from("kalamkari_access_token", value)
                .httpOnly(true).secure(secureCookie).sameSite("Lax").path("/").maxAge(maxAge).build();
    }
}
