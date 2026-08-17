package org.wilsonks.backend.config;

import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;import org.springframework.security.config.http.SessionCreationPolicy;import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;import org.springframework.security.crypto.password.PasswordEncoder;import org.springframework.security.web.*;import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;import org.springframework.web.cors.*;
import org.wilsonks.backend.service.JwtFilter;

import java.util.*;

@Configuration
public class SecurityConfig {
    @Bean
    SecurityFilterChain filter(HttpSecurity httpSecurity, JwtFilter jwtFilter)throws Exception{
        httpSecurity
                .csrf(x->x.disable())
                .cors(x->{})
                .sessionManagement(x->x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        auth->
                                        auth.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                                         .requestMatchers("/h2-console/**").permitAll()
                                         .requestMatchers("/api/v1/auth/register","/api/v1/auth/login","/api/v1/consents/current","/actuator/health").permitAll()
                                         .requestMatchers("/api/v1/auth/email/**","/api/v1/auth/phone/**","/api/v1/auth/me","/api/v1/auth/logout","/api/v1/auth/registration/status","/api/v1/consents").authenticated()
                                         .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable())
                .headers(h -> h.frameOptions(frame -> frame.sameOrigin()))
                .addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();}

    @Bean PasswordEncoder passwordEncoder(){
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean CorsConfigurationSource cors(){
        CorsConfiguration c=new CorsConfiguration();
        c.setAllowedOrigins(List.of("http://localhost:3000"));
        c.setAllowedMethods(List.of("GET","POST","OPTIONS"));
        c.setAllowedHeaders(List.of("*"));
        c.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource s=new UrlBasedCorsConfigurationSource();
        s.registerCorsConfiguration("/**",c);
        return s;
    }
}

