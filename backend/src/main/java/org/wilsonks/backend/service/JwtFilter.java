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

        // Handle CORS preflight requests
        if (CorsUtils.isPreFlightRequest(request)) {
            log.debug("CORS preflight request detected: {} {}", request.getMethod(), request.getRequestURI());
            // Don't process JWT for preflight, just continue the chain
            // CORS headers will be added by CorsFilter
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

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        // Skip JWT filter for these paths
        return path.startsWith("/api/v1/auth/register") ||
                path.startsWith("/api/v1/auth/login") ||
                path.startsWith("/api/v1/auth/status") ||
                path.startsWith("/api/v1/consents/current") ||
                path.startsWith("/actuator/health") ||
                path.startsWith("/h2-console");
    }
}