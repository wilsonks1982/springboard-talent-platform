package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.requests.CandidateCareerPreferencesRequest;
import org.wilsonks.backend.dto.responses.CandidateCareerPreferencesResponse;
import org.wilsonks.backend.service.CandidateCareerPreferencesService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/career-preferences")
@RequiredArgsConstructor
@Slf4j
public class CandidateCareerPreferencesController {

    private final CandidateCareerPreferencesService service;

    @GetMapping
    public CandidateCareerPreferencesResponse get(
            @AuthenticationPrincipal UUID userId
    ) {

        Candidate candidate = service.getCandidate(userId);

        return CandidateCareerPreferencesResponse.of(candidate);
    }

    @PutMapping
    public CandidateCareerPreferencesResponse update(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody CandidateCareerPreferencesRequest request
    ) {

        Candidate candidate = service.update(userId, request);
        return CandidateCareerPreferencesResponse.of(candidate);
    }
}