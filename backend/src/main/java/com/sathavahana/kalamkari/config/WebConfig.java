package com.sathavahana.kalamkari.config;
import org.springframework.context.annotation.*; import org.springframework.beans.factory.annotation.Value; import org.springframework.web.servlet.config.annotation.*;
@Configuration public class WebConfig implements WebMvcConfigurer { @Value("${app.cors.allowed-origins:http://localhost:3000}") private String origins; @Override public void addCorsMappings(CorsRegistry r){r.addMapping("/api/**").allowedOrigins(origins.split(",")).allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS").allowedHeaders("*");}}
