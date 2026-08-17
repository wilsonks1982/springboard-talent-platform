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

    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain filterChain)throws ServletException,IOException{

        if (CorsUtils.isPreFlightRequest(request)) {
            log.info("Preflight request detected, skipping JWT filter");
            filterChain.doFilter(request, response);
            return;
        }

        String header=request.getHeader("Authorization");
        if(header!=null&&header.startsWith("Bearer "))
            try{
                var claims= jwtService.parse(header.substring(7));
                UUID id=UUID.fromString(claims.getSubject());
                String role=claims.get("role",String.class);
                var a=role==null?List.<SimpleGrantedAuthority>of():List.of(new SimpleGrantedAuthority("ROLE_"+role));

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(new UsernamePasswordAuthenticationToken(id,null,a));
            }catch(Exception e){
                log.warn("JWT parsing failed: "+e.getMessage());
                SecurityContextHolder.clearContext();
            }
        filterChain.doFilter(request,response);
    }
}
