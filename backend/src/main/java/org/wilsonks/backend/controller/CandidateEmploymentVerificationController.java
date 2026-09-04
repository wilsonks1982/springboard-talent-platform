package org.wilsonks.backend.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.requests.CandidateEmploymentVerificationRequest;
import org.wilsonks.backend.dto.responses.CandidateEmploymentVerificationResponse;
import org.wilsonks.backend.service.CandidateEmploymentVerificationService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/employment-verification")
@RequiredArgsConstructor
public class CandidateEmploymentVerificationController {

    private final CandidateEmploymentVerificationService service;

    @GetMapping
    public CandidateEmploymentVerificationResponse get(@AuthenticationPrincipal UUID userId) {
        Candidate candidate = service.getCandidate(userId);

        return service.get(candidate);
    }

    @PutMapping
    public CandidateEmploymentVerificationResponse update(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateEmploymentVerificationRequest request) {
        Candidate candidate = service.getCandidate(userId);

        return service.update(candidate, request);
    }

    @PostMapping("/trigger")
    public CandidateEmploymentVerificationResponse triggerVerification(@AuthenticationPrincipal UUID userId) {
        Candidate candidate = service.getCandidate(userId);

        return service.triggerVerification(candidate);
    }
}