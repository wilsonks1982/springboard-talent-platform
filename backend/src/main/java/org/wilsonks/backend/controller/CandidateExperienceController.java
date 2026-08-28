package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.CandidateExperience;
import org.wilsonks.backend.dto.requests.CandidateExperienceRequest;
import org.wilsonks.backend.dto.responses.CandidateExperienceResponse;
import org.wilsonks.backend.service.CandidateExperienceService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/experiences")
@RequiredArgsConstructor
public class CandidateExperienceController {

    private final CandidateExperienceService experienceService;

    @GetMapping
    public List<CandidateExperienceResponse> getMyExperiences(Authentication authentication) {
        UUID userId = (UUID) authentication.getPrincipal();

        return experienceService.getMyExperiences(userId).stream().map(CandidateExperienceResponse::of).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateExperienceResponse create(Authentication authentication, @RequestBody CandidateExperienceRequest request) {

        UUID userId = (UUID) authentication.getPrincipal();
        CandidateExperience experience = experienceService.create(userId, request);

        return CandidateExperienceResponse.of(experience);
    }

    @PutMapping("/{experienceId}")
    public CandidateExperienceResponse update(Authentication authentication, @PathVariable UUID experienceId, @RequestBody CandidateExperienceRequest request) {

        UUID userId = (UUID) authentication.getPrincipal();
        CandidateExperience experience = experienceService.update(userId, experienceId, request);

        return CandidateExperienceResponse.of(experience);
    }

    @DeleteMapping("/{experienceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(Authentication authentication, @PathVariable UUID experienceId) {

        UUID userId = (UUID) authentication.getPrincipal();
        experienceService.delete(userId, experienceId);
    }
}
