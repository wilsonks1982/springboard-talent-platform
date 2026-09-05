package org.wilsonks.backend.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.requests.NotableAchievementsRequest;
import org.wilsonks.backend.dto.responses.NotableAchievementResponse;
import org.wilsonks.backend.service.NotableAchievementService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/notable-achievements")
@RequiredArgsConstructor
public class CandidateNotableAchievementController {

    private final NotableAchievementService
            notableAchievementService;

    @GetMapping
    public List<NotableAchievementResponse> getMyAchievements(
            @AuthenticationPrincipal UUID userId) {

        return notableAchievementService
                .getMyAchievements(userId);
    }

    @PutMapping
    public List<NotableAchievementResponse> replaceAchievements(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody
            NotableAchievementsRequest request) {

        return notableAchievementService
                .replaceAchievements(
                        userId,
                        request
                );
    }
}