package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.CandidateCertification;
import org.wilsonks.backend.dto.requests.CandidateCertificationRequest;
import org.wilsonks.backend.dto.responses.CandidateCertificationResponse;
import org.wilsonks.backend.service.CandidateCertificationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/certifications")
@RequiredArgsConstructor
public class CandidateCertificationController {

    private final CandidateCertificationService certificationService;

    @GetMapping
    public List<CandidateCertificationResponse> getMyCertifications(@AuthenticationPrincipal UUID userId) {

        return certificationService.getMyCertifications(userId).stream().map(CandidateCertificationResponse::of).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateCertificationResponse create(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateCertificationRequest request) {

        CandidateCertification certification = certificationService.create(userId, request);

        return CandidateCertificationResponse.of(certification);
    }

    @PutMapping("/{id}")
    public CandidateCertificationResponse update(@AuthenticationPrincipal UUID userId, @PathVariable UUID id, @Valid @RequestBody CandidateCertificationRequest request) {

        CandidateCertification certification = certificationService.update(userId, id, request);

        return CandidateCertificationResponse.of(certification);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal UUID userId, @PathVariable UUID id) {

        certificationService.delete(userId, id);
    }
}
