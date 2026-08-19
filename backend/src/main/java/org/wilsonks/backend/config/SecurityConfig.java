package org.wilsonks.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.wilsonks.backend.service.JwtFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${app.cors.allowed-methods}")
    private String allowedMethods;

    @Value("${app.cors.allowed-headers}")
    private String allowedHeaders;

    @Value("${app.cors.allow-credentials:true}")
    private boolean allowCredentials;

    @Value("${app.cors.max-age:3600}")
    private long maxAge;

    @Bean
    SecurityFilterChain filter(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        .requestMatchers(
                                "/h2-console/**",
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/api/v1/consents/current",
                                "/actuator/health"
                        ).permitAll()

                        .requestMatchers(
                                "/api/v1/auth/email/**",
                                "/api/v1/auth/phone/**",
                                "/api/v1/auth/me",
                                "/api/v1/auth/logout",
                                "/api/v1/auth/registration/status",
                                "/api/v1/consents"
                        ).authenticated()

                        .anyRequest().authenticated()
                )

                .formLogin(form -> form.disable())
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        // Parse comma-separated origins
        List<String> origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .toList();

        // Parse comma-separated methods
        List<String> methods = Arrays.stream(allowedMethods.split(","))
                .map(String::trim)
                .toList();

        // Parse comma-separated headers
        List<String> headers = Arrays.stream(allowedHeaders.split(","))
                .map(String::trim)
                .toList();

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(origins);
        configuration.setAllowedMethods(methods);
        configuration.setAllowedHeaders(headers);
        configuration.setAllowCredentials(allowCredentials);
        configuration.setMaxAge(maxAge); //Set max age for preflight requests 3600 seconds (1 hour) means the browser will cache the preflight response for 1 hour

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}