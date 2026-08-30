package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.CandidateEducation;
import org.wilsonks.backend.dto.requests.CandidateEducationRequest;
import org.wilsonks.backend.dto.responses.CandidateEducationResponse;
import org.wilsonks.backend.service.CandidateEducationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/education")
@RequiredArgsConstructor
public class CandidateEducationController {

    private final CandidateEducationService educationService;

    @GetMapping
    public List<CandidateEducationResponse> getMyEducation(@AuthenticationPrincipal UUID userId) {

        return educationService.getMyEducation(userId).stream().map(CandidateEducationResponse::of).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateEducationResponse create(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateEducationRequest request) {

        CandidateEducation education = educationService.create(userId, request);

        return CandidateEducationResponse.of(education);
    }

    @PutMapping("/{id}")
    public CandidateEducationResponse update(@AuthenticationPrincipal UUID userId, @PathVariable UUID id, @Valid @RequestBody CandidateEducationRequest request) {

        CandidateEducation education = educationService.update(userId, id, request);

        return CandidateEducationResponse.of(education);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal UUID userId, @PathVariable UUID id) {

        educationService.delete(userId, id);
    }
}