package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.CandidateAchievement;
import org.wilsonks.backend.dto.requests.CandidateAchievementRequest;
import org.wilsonks.backend.dto.responses.CandidateAchievementResponse;
import org.wilsonks.backend.service.CandidateAchievementService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/achievements")
@RequiredArgsConstructor
public class CandidateAchievementController {

    private final CandidateAchievementService achievementService;

    @GetMapping
    public List<CandidateAchievementResponse> getMyAchievements(@AuthenticationPrincipal UUID userId) {

        return achievementService.getMyAchievements(userId).stream().map(CandidateAchievementResponse::of).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateAchievementResponse create(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CandidateAchievementRequest request) {

        CandidateAchievement achievement = achievementService.create(userId, request);

        return CandidateAchievementResponse.of(achievement);
    }

    @PutMapping("/{id}")
    public CandidateAchievementResponse update(@AuthenticationPrincipal UUID userId, @PathVariable UUID id, @Valid @RequestBody CandidateAchievementRequest request) {

        CandidateAchievement achievement = achievementService.update(userId, id, request);

        return CandidateAchievementResponse.of(achievement);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal UUID userId, @PathVariable UUID id) {

        achievementService.delete(userId, id);
    }
}
