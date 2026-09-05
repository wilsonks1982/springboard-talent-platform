package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.requests.KeyStrengthsRequest;
import org.wilsonks.backend.dto.responses.KeyStrengthResponse;
import org.wilsonks.backend.service.KeyStrengthService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/key-strengths")
@RequiredArgsConstructor
public class CandidateKeyStrengthController {

    private final KeyStrengthService keyStrengthService;

    @GetMapping
    public List<KeyStrengthResponse> getMyStrengths(
            @AuthenticationPrincipal UUID userId) {

        return keyStrengthService.getMyStrengths(userId);
    }

    @PutMapping
    public List<KeyStrengthResponse> replaceStrengths(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody KeyStrengthsRequest request) {

        return keyStrengthService.replaceStrengths(
                userId,
                request
        );
    }
}