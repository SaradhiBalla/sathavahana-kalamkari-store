package com.sathavahana.kalamkari.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI kalamkariOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sathavahana Kalamkari House API")
                        .version("v1")
                        .description("REST API for the Kalamkari House storefront, customer accounts, commerce, and administration.")
                        .contact(new Contact().name("Sathavahana Kalamkari House")))
                .components(new Components()
                        .addSecuritySchemes("kalamkari_access_token",
                                new SecurityScheme()
                                        .name("kalamkari_access_token")
                                        .type(SecurityScheme.Type.APIKEY)
                                        .in(SecurityScheme.In.COOKIE)
                                        .description("HttpOnly access-token cookie set by POST /api/v1/auth/login or /api/v1/auth/register.")));
    }
}
