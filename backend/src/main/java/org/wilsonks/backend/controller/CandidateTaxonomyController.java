package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.requests.CandidateTagSelectionRequest;
import org.wilsonks.backend.dto.responses.CandidateIndustryResponse;
import org.wilsonks.backend.dto.responses.CandidateSkillResponse;
import org.wilsonks.backend.service.CandidateIndustryService;
import org.wilsonks.backend.service.CandidateSkillService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me")
@RequiredArgsConstructor
public class CandidateTaxonomyController {

    private final CandidateIndustryService candidateIndustryService;
    private final CandidateSkillService candidateSkillService;

    @GetMapping("/industries")
    public List<CandidateIndustryResponse> getIndustries(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            UUID userId) {

        return candidateIndustryService.getMyIndustries(userId);
    }

    @PutMapping("/industries")
    public List<CandidateIndustryResponse> replaceIndustries(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            UUID userId,
            @Valid @RequestBody CandidateTagSelectionRequest request) {

        return candidateIndustryService
                .replaceIndustries(userId, request);
    }

    @GetMapping("/skills")
    public List<CandidateSkillResponse> getSkills(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            UUID userId) {

        return candidateSkillService.getMySkills(userId);
    }

    @PutMapping("/skills")
    public List<CandidateSkillResponse> replaceSkills(
            @org.springframework.security.core.annotation.AuthenticationPrincipal
            UUID userId,
            @Valid @RequestBody CandidateTagSelectionRequest request) {

        return candidateSkillService
                .replaceSkills(userId, request);
    }
}