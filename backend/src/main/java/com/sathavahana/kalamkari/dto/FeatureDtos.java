package com.sathavahana.kalamkari.dto;

import jakarta.validation.constraints.*;
import java.util.Map;

public final class FeatureDtos {
    private FeatureDtos() {}
    public record PreferenceRequest(@NotBlank String channel, @NotBlank String eventType, boolean enabled) {}
    public record BackInStockRequest(@NotNull Long productId, @Email String email) {}
    public record ViewRequest(@NotNull Long productId, String visitorToken) {}
    public record AnalyticsRequest(@NotBlank String eventType, Long productId, String queryText,
                                   String visitorToken, Map<String,Object> metadata) {}
    public record NotificationRequest(@NotBlank String eventType, @NotBlank String title, @NotBlank String body) {}
}
