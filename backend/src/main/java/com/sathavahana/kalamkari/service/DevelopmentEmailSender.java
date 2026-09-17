package com.sathavahana.kalamkari.service;

/** Delivery boundary. Production integrations can implement this port without coupling the domain to a provider. */
public interface DevelopmentEmailSender {
    DeliveryResult send(String recipient, String subject, String body);
    record DeliveryResult(String status, String providerMessageId, String errorMessage) {}
}
