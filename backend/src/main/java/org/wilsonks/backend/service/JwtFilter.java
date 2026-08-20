package org.wilsonks.backend.service;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI(); // Log the request URI for debugging
        String method = request.getMethod(); // Log the request method for debugging
        log.debug("Processing request URI: {}, method: {} ", uri, method);

        if("OPTIONS".equalsIgnoreCase(method) || isPublicEndpoint(uri) || CorsUtils.isPreFlightRequest(request)) {
            log.info("Skipping JWT validation for public endpoint or OPTIONS request: {} {}", method, uri);
            filterChain.doFilter(request, response);
            return;
        }

        // Process JWT for actual requests
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                var claims = jwtService.parse(token);
                UUID id = UUID.fromString(claims.getSubject());
                String role = claims.get("role", String.class);

                var authorities = role == null
                        ? List.<SimpleGrantedAuthority>of()
                        : List.of(new SimpleGrantedAuthority("ROLE_" + role));

                var authentication = new UsernamePasswordAuthenticationToken(id, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                log.debug("JWT validated for user: {}", id);
            } catch (Exception e) {
                log.warn("JWT parsing failed: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        } else {
            log.debug("No Bearer token found in request");
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }

    private boolean isPublicEndpoint(String uri) {
        return uri.contains("/auth/register") ||
                uri.contains("/auth/login") ||
                uri.contains("/auth/status") ||
                uri.contains("/consents/current") ||
                uri.contains("/actuator/health") ||
                uri.contains("/h2-console") ||
                uri.equals("/favicon.ico") ||
                uri.equals("/robots.txt") ||
                uri.endsWith(".js") ||
                uri.endsWith(".css") ||
                uri.endsWith(".map");
    }
}