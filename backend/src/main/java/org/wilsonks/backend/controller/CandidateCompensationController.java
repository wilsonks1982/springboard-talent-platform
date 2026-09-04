package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.requests.CandidateCompensationRequest;
import org.wilsonks.backend.dto.responses.CandidateCompensationResponse;
import org.wilsonks.backend.service.CandidateCompensationService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/compensation")
@RequiredArgsConstructor
@Slf4j
public class CandidateCompensationController {

    private final CandidateCompensationService service;

    @GetMapping
    public CandidateCompensationResponse get(@AuthenticationPrincipal UUID userId) {

        Candidate candidate = service.getCandidate(userId);

        return CandidateCompensationResponse.of(candidate);
    }

    @PutMapping
    public CandidateCompensationResponse update(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateCompensationRequest request) {

        Candidate candidate = service.update(userId, request);

        return CandidateCompensationResponse.of(candidate);
    }
}