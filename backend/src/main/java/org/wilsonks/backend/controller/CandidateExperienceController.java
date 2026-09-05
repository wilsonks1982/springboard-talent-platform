package org.wilsonks.backend.controller;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.CandidateExperience;
import org.wilsonks.backend.dto.requests.CandidateExperienceRequest;
import org.wilsonks.backend.dto.responses.CandidateExperienceResponse;
import org.wilsonks.backend.dto.responses.EmploymentHistoryAnalysisResponse;
import org.wilsonks.backend.service.CandidateExperienceService;
import org.wilsonks.backend.service.EmploymentHistoryAnalysisService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/employment-history")
@RequiredArgsConstructor
public class CandidateExperienceController {

    private final CandidateExperienceService experienceService;
    private final EmploymentHistoryAnalysisService experienceAnalysisService;


    @GetMapping
    public List<CandidateExperienceResponse> getMyExperiences(
            @AuthenticationPrincipal UUID userId) {

        return experienceService
                .getMyExperiences(userId)
                .stream()
                .map(CandidateExperienceResponse::of)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateExperienceResponse create(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody CandidateExperienceRequest request) {

        CandidateExperience experience =
                experienceService.create(userId, request);

        return CandidateExperienceResponse.of(experience);
    }

    @PutMapping("/{id}")
    public CandidateExperienceResponse update(
            @AuthenticationPrincipal UUID userId,
            @PathVariable UUID id,
            @Valid @RequestBody CandidateExperienceRequest request) {

        CandidateExperience experience =
                experienceService.update(userId, id, request);

        return CandidateExperienceResponse.of(experience);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @AuthenticationPrincipal UUID userId,
            @PathVariable UUID id) {

        experienceService.delete(userId, id);
    }

    @GetMapping("/analysis")
    public EmploymentHistoryAnalysisResponse getEmploymentHistoryAnalysis(
            @AuthenticationPrincipal UUID userId) {

        return experienceAnalysisService
                .analyzeMyEmploymentHistory(
                        userId,
                        LocalDate.now()
                );
    }
}
