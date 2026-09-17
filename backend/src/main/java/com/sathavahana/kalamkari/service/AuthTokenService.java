package com.sathavahana.kalamkari.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

@Component
public class AuthTokenService {
    private final byte[] secret;
    public AuthTokenService(@Value("${app.auth.secret}") String secret) {
        if (secret.length() < 32) throw new IllegalStateException("app.auth.secret must be at least 32 characters");
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
    }
    public String issue(Long userId) {
        long expiry = Instant.now().plusSeconds(86_400).getEpochSecond();
        String payload = userId + "." + expiry;
        return payload + "." + sign(payload);
    }
    public Long verify(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3 || !MessageDigestSafe.equals(sign(parts[0] + "." + parts[1]), parts[2])
                    || Long.parseLong(parts[1]) < Instant.now().getEpochSecond()) throw new UnauthorizedException("Invalid or expired token");
            return Long.valueOf(parts[0]);
        } catch (NumberFormatException e) {
            throw new UnauthorizedException("Invalid or expired token");
        }
    }
    private String sign(String payload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret, "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(payload.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) { throw new IllegalStateException("Token signing unavailable", e); }
    }
    private static final class MessageDigestSafe {
        static boolean equals(String a, String b) {
            return java.security.MessageDigest.isEqual(a.getBytes(StandardCharsets.UTF_8), b.getBytes(StandardCharsets.UTF_8));
        }
    }
}
