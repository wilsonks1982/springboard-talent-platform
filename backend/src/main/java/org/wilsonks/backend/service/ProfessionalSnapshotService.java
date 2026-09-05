package org.wilsonks.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.*;
import org.wilsonks.backend.dto.responses.*;
import org.wilsonks.backend.repository.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfessionalSnapshotService {

    private final EmploymentHistoryAnalysisService
            employmentHistoryAnalysisService;

    private final CandidateExperiencesRepository
            experienceRepository;

    private final CandidateIndustryRepository
            industryRepository;

    private final CandidateSkillRepository
            skillRepository;

    private final KeyStrengthRepository
            keyStrengthRepository;

    private final CandidatesEducationRepository
            educationRepository;

    private final CandidateCertificationsRepository
            certificationRepository;

    private final CareerSummaryRepository
            careerSummaryRepository;

    private final NotableAchievementRepository
            notableAchievementRepository;

    public ProfessionalSnapshotResponse getMySnapshot(
            UUID userId) {

        EmploymentHistoryAnalysisResponse analysis =
                employmentHistoryAnalysisService
                        .analyzeMyEmploymentHistory(
                                userId,
                                LocalDate.now()
                        );

        List<CandidateExperienceResponse> employmentHistory =
                experienceRepository
                        .findAllByCandidateUserIdOrderByStartDateDesc(userId)
                        .stream()
                        .map(CandidateExperienceResponse::of)
                        .toList();

        List<IndustryTagResponse> industryTags =
                industryRepository
                        .findAllByCandidateUserId(userId)
                        .stream()
                        .map(candidateIndustry ->
                                IndustryTagResponse.of(
                                        candidateIndustry.getIndustryTag()
                                ))
                        .toList();

        List<SkillTagResponse> skillTags =
                skillRepository
                        .findAllByCandidateUserId(userId)
                        .stream()
                        .map(candidateSkill ->
                                SkillTagResponse.of(
                                        candidateSkill.getSkillTag()
                                ))
                        .toList();

        List<KeyStrengthResponse> keyStrengths =
                keyStrengthRepository
                        .findAllByCandidateUserIdOrderByDisplayOrderAsc(userId)
                        .stream()
                        .map(KeyStrengthResponse::of)
                        .toList();

        List<CandidateEducationResponse> education =
                educationRepository
                        .findByCandidateUserIdOrderByDisplayOrderAsc(userId)
                        .stream()
                        .map(CandidateEducationResponse::of)
                        .toList();

        List<CandidateCertificationResponse> certifications =
                certificationRepository
                        .findAllByCandidateUserIdOrderByDisplayOrderAsc(userId)
                        .stream()
                        .map(CandidateCertificationResponse::of)
                        .toList();

        CareerSummaryResponse careerSummary =
                careerSummaryRepository
                        .findByCandidateUserId(userId)
                        .map(CareerSummaryResponse::of)
                        .orElse(null);

        List<NotableAchievementResponse> notableAchievements =
                notableAchievementRepository
                        .findAllByCandidateUserIdOrderByDisplayOrderAsc(userId)
                        .stream()
                        .map(NotableAchievementResponse::of)
                        .toList();

        return new ProfessionalSnapshotResponse(
                analysis.currentTitle(),
                analysis.currentCompany(),
                analysis.yearsExperience(),
                employmentHistory,
                industryTags,
                skillTags,
                keyStrengths,
                education,
                certifications,
                careerSummary,
                notableAchievements
        );
    }
}