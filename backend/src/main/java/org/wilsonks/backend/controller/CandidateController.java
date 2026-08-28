package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.CandidateResponse;
import org.wilsonks.backend.service.CandidateService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping("/me")
    public CandidateResponse getMyProfile(Authentication authentication) {

        UUID userId = (UUID) authentication.getPrincipal();

        return candidateService.getMyProfile(userId);
    }
}