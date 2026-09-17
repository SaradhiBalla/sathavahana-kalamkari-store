package com.sathavahana.kalamkari.service;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Safe local implementation: it never contacts an external service. Delivery is intentionally recorded as skipped.
 */
@Component
@Profile("!smtp")
public class NoopDevelopmentEmailSender implements DevelopmentEmailSender {
    @Override public DeliveryResult send(String recipient, String subject, String body) {
        return new DeliveryResult("SKIPPED_DEVELOPMENT", null, "External email delivery is disabled");
    }
}
