package org.wilsonks.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.responses.ProfileStrengthResponse;
import org.wilsonks.backend.service.ProfileStrengthService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/profile-strength")
@RequiredArgsConstructor
public class CandidateProfileStrengthController {

    private final ProfileStrengthService profileStrengthService;

    @GetMapping
    public ProfileStrengthResponse getProfileStrength(@AuthenticationPrincipal UUID userId) {
        return profileStrengthService.calculate(userId);
    }
}