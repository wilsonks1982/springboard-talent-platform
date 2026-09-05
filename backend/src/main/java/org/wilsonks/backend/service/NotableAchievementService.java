package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.NotableAchievement;
import org.wilsonks.backend.dto.requests.NotableAchievementsRequest;
import org.wilsonks.backend.dto.responses.NotableAchievementResponse;
import org.wilsonks.backend.repository.NotableAchievementRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional
public class NotableAchievementService {

    private static final int MIN_ACHIEVEMENTS = 3;
    private static final int MAX_ACHIEVEMENTS = 5;
    private static final int MAX_LENGTH = 500;

    private final CandidateService candidateService;
    private final NotableAchievementRepository
            notableAchievementRepository;

    @Transactional(readOnly = true)
    public List<NotableAchievementResponse> getMyAchievements(
            UUID userId) {

        return notableAchievementRepository
                .findAllByCandidateUserIdOrderByDisplayOrderAsc(userId)
                .stream()
                .map(NotableAchievementResponse::of)
                .toList();
    }

    public List<NotableAchievementResponse> replaceAchievements(
            UUID userId,
            NotableAchievementsRequest request) {

        Candidate candidate =
                candidateService.getCandidateByUserId(userId);

        List<String> achievements =
                normalize(request.achievements());

        validate(achievements);

        notableAchievementRepository
                .deleteAllByCandidateUserId(userId);

        List<NotableAchievement> entities =
                IntStream.range(0, achievements.size())
                        .mapToObj(index ->
                                createAchievement(
                                        candidate,
                                        achievements.get(index),
                                        index
                                ))
                        .toList();

        return notableAchievementRepository
                .saveAll(entities)
                .stream()
                .map(NotableAchievementResponse::of)
                .toList();
    }

    private List<String> normalize(
            List<String> achievements) {

        return achievements.stream()
                .map(String::trim)
                .filter(value -> !value.isEmpty())
                .toList();
    }

    private void validate(
            List<String> achievements) {

        if (achievements.isEmpty()) {
            return;
        }

        if (achievements.size() < MIN_ACHIEVEMENTS ||
                achievements.size() > MAX_ACHIEVEMENTS) {

            throw new IllegalArgumentException(
                    "Notable achievements must contain between "
                            + MIN_ACHIEVEMENTS
                            + " and "
                            + MAX_ACHIEVEMENTS
                            + " items."
            );
        }

        boolean tooLong =
                achievements.stream()
                        .anyMatch(
                                achievement ->
                                        achievement.length()
                                                > MAX_LENGTH
                        );

        if (tooLong) {
            throw new IllegalArgumentException(
                    "Each notable achievement must not exceed "
                            + MAX_LENGTH
                            + " characters."
            );
        }
    }

    private NotableAchievement createAchievement(
            Candidate candidate,
            String achievement,
            int displayOrder) {

        NotableAchievement entity =
                new NotableAchievement();

        entity.setCandidate(candidate);
        entity.setAchievement(achievement);
        entity.setDisplayOrder(displayOrder);

        return entity;
    }
}