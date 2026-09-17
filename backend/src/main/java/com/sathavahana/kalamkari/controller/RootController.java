package com.sathavahana.kalamkari.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, Object> home() {
        return Map.of(
                "name", "Sathavahana Kalamkari API",
                "status", "running",
                "message", "Use /api/v1/products to fetch catalog data.",
                "availableEndpoints", Map.of(
                        "products", "/api/v1/products",
                        "categories", "/api/v1/categories",
                        "cart", "/api/v1/cart",
                        "orders", "/api/v1/orders"));
    }

    @GetMapping("/error")
    public Map<String, Object> error(HttpServletRequest request) {
        Object statusCode = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object message = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);

        int status = statusCode != null ? Integer.parseInt(statusCode.toString()) : HttpStatus.NOT_FOUND.value();

        return Map.of(
                "status", status,
                "error", HttpStatus.valueOf(status).getReasonPhrase(),
                "message",
                message != null ? message : "The requested endpoint was not found or could not be processed.",
                "hint", "Try /api/v1/products or the storefront at http://localhost:3000");
    }
}
