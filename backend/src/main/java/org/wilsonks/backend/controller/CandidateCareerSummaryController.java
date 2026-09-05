package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.requests.CareerSummaryRequest;
import org.wilsonks.backend.dto.responses.CareerSummaryResponse;
import org.wilsonks.backend.service.CareerSummaryService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/career-summary")
@RequiredArgsConstructor
public class CandidateCareerSummaryController {

    private final CareerSummaryService careerSummaryService;

    @GetMapping
    public CareerSummaryResponse getMySummary(
            @AuthenticationPrincipal UUID userId) {

        return careerSummaryService.getMySummary(userId);
    }

    @PutMapping
    public CareerSummaryResponse save(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody CareerSummaryRequest request) {

        return careerSummaryService.save(
                userId,
                request
        );
    }
}