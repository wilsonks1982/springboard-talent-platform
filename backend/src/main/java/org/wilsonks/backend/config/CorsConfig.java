package org.wilsonks.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Slf4j
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        log.warn("╔════════════════════════════════════════════════════════════════╗");
        log.warn("║         ⚠️  CORS VALIDATION DISABLED - DEV ONLY                ║");
        log.warn("║  All origins, methods, and headers are allowed                  ║");
        log.warn("╚════════════════════════════════════════════════════════════════╝");

        CorsConfiguration config = new CorsConfiguration();

        // Allow all origins using pattern matching
        config.addAllowedOriginPattern("*");

        // Allow all HTTP methods
        config.addAllowedMethod("*");

        // Allow all headers
        config.addAllowedHeader("*");

        // Expose all headers
        config.addExposedHeader("*");

        // Allow credentials (must be false with wildcard)
        config.setAllowCredentials(false);

        // Cache preflight for 1 hour
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        log.info("✓ CORS Filter configured");
        log.info("  - Allowed Origins: *");
        log.info("  - Allowed Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
        log.info("  - Allowed Headers: *");
        log.info("  - Credentials: false");
        log.info("  - Max Age: 3600 seconds");

        return source;
    }

    @Bean
    public CorsFilter corsFilter(CorsConfigurationSource corsConfigurationSource) {
        log.debug("Registering CorsFilter bean");
        return new CorsFilter(corsConfigurationSource);
    }
}