package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.requests.CandidateBasicProfileRequest;
import org.wilsonks.backend.dto.responses.CandidateBasicProfileResponse;
import org.wilsonks.backend.service.CandidateBasicProfileService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/basic-profile")
@RequiredArgsConstructor
@Slf4j
public class CandidateBasicProfileController {

    private final CandidateBasicProfileService service;

    @GetMapping
    public CandidateBasicProfileResponse get(@AuthenticationPrincipal UUID userId) {

        Candidate candidate = service.getCandidate(userId);

        return CandidateBasicProfileResponse.of(candidate);
    }

    @PutMapping
    public CandidateBasicProfileResponse update(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateBasicProfileRequest request) {

        Candidate candidate = service.update(userId, request);

        return CandidateBasicProfileResponse.of(candidate);
    }
}