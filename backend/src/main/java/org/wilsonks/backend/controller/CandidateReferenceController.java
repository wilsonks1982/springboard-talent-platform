package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.CandidateReference;
import org.wilsonks.backend.dto.requests.CandidateReferenceRequest;
import org.wilsonks.backend.dto.responses.CandidateReferenceResponse;
import org.wilsonks.backend.service.CandidateReferenceService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/references")
@RequiredArgsConstructor
public class CandidateReferenceController {

    private final CandidateReferenceService referenceService;

    @GetMapping
    public List<CandidateReferenceResponse> getMyReferences(@AuthenticationPrincipal UUID userId) {

        return referenceService.getMyReferences(userId).stream().map(CandidateReferenceResponse::of).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateReferenceResponse create(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateReferenceRequest request) {

        CandidateReference reference = referenceService.create(userId, request);

        return CandidateReferenceResponse.of(reference);
    }

    @PutMapping("/{id}")
    public CandidateReferenceResponse update(@AuthenticationPrincipal UUID userId, @PathVariable UUID id, @Valid @RequestBody CandidateReferenceRequest request) {

        CandidateReference reference = referenceService.update(userId, id, request);

        return CandidateReferenceResponse.of(reference);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal UUID userId, @PathVariable UUID id) {

        referenceService.delete(userId, id);
    }
}