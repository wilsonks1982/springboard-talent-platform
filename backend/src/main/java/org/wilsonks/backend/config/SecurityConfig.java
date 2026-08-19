package org.wilsonks.backend.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.wilsonks.backend.service.JwtFilter;

@Configuration
@EnableWebSecurity
@Slf4j
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;
    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("Configuring Security Filter Chain");

        http
                // Enable CORS FIRST
                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                // Then disable CSRF
                .csrf(csrf -> csrf.disable())

                // Set session policy to stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Authorization
                .authorizeHttpRequests(auth -> auth
                        // Allow OPTIONS requests (CORS preflight)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public endpoints
                        .requestMatchers(
                                "/h2-console/**",
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/api/v1/auth/status",
                                "/api/v1/consents/current",
                                "/actuator/health"
                        ).permitAll()

                        // Authenticated endpoints
                        .requestMatchers(
                                "/api/v1/auth/email/**",
                                "/api/v1/auth/phone/**",
                                "/api/v1/auth/me",
                                "/api/v1/auth/logout",
                                "/api/v1/auth/registration/status",
                                "/api/v1/consents"
                        ).authenticated()

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                // Disable form login
                .formLogin(form -> form.disable())

                // Allow H2 console frames
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))

                // Add JWT filter AFTER security filters
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        log.info("✓ Security Filter Chain configured successfully");
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}