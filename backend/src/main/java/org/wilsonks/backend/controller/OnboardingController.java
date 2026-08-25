package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.OnboardingResponse;
import org.wilsonks.backend.service.OnboardingService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/onboarding")
@RequiredArgsConstructor
public class OnboardingController {

    private final OnboardingService onboardingService;

    @GetMapping
    public OnboardingResponse getOnboarding(
            Authentication authentication) {

        UUID userId = UUID.fromString(authentication.getName());

        return onboardingService.getOnboarding(userId);
    }
}