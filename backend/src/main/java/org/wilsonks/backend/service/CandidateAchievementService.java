package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateAchievement;
import org.wilsonks.backend.dto.requests.CandidateAchievementRequest;
import org.wilsonks.backend.repository.CandidateAchievementsRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateAchievementService {

    private final CandidateService candidateService;
    private final CandidateAchievementsRepository achievementRepository;

    @Transactional(readOnly = true)
    public List<CandidateAchievement> getMyAchievements(UUID userId) {
        return achievementRepository.findByCandidateUserIdOrderByDisplayOrderAsc(userId);
    }

    public CandidateAchievement create(UUID userId, CandidateAchievementRequest request) {

        Candidate candidate = candidateService.getCandidateByUserId(userId);

        CandidateAchievement achievement = new CandidateAchievement();

        achievement.setCandidate(candidate);
        achievement.setTitle(request.title().trim());

        achievement.setDescription(request.description() != null ? request.description().trim() : null);

        int nextOrder = achievementRepository.findByCandidateUserIdOrderByDisplayOrderAsc(userId).size();

        achievement.setDisplayOrder(nextOrder);

        return achievementRepository.save(achievement);
    }

    public CandidateAchievement update(UUID userId, UUID achievementId, CandidateAchievementRequest request) {

        CandidateAchievement achievement = achievementRepository.findById(achievementId).orElseThrow(() -> new IllegalArgumentException("Achievement record not found."));

        validateOwnership(achievement, userId);

        achievement.setTitle(request.title().trim());

        achievement.setDescription(request.description() != null ? request.description().trim() : null);

        return achievementRepository.save(achievement);
    }

    public void delete(UUID userId, UUID achievementId) {

        CandidateAchievement achievement = achievementRepository.findById(achievementId).orElseThrow(() -> new IllegalArgumentException("Achievement record not found."));

        validateOwnership(achievement, userId);

        achievementRepository.delete(achievement);
    }

    private void validateOwnership(CandidateAchievement achievement, UUID userId) {

        if (!achievement.getCandidate().getUser().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Achievement record does not belong to this candidate.");
        }
    }
}
