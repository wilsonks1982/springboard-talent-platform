package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.dto.OnboardingResponse;
import org.wilsonks.backend.repository.CandidatesRepository;
import org.wilsonks.backend.repository.UsersRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OnboardingService {

    private final UsersRepository usersRepo;
    private final CandidatesRepository candidatesRepo;

    @Transactional(readOnly = true)
    public OnboardingResponse getOnboarding(UUID userId) {

        User user = usersRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        Candidate candidate = candidatesRepo.findById(userId).orElseThrow(() -> new IllegalStateException("Candidate profile not found."));

        List<OnboardingResponse.ExperienceResponse> experiences = candidate.getExperiences()
                        .stream()
                        .map(experience ->
                                new OnboardingResponse.ExperienceResponse(
                                        experience.getId(),
                                        experience.getCompanyName(),
                                        experience.getJobTitle(),
                                        experience.getStartDate(),
                                        experience.getEndDate(),
                                        experience.isCurrent(),
                                        experience.getDescription(),
                                        experience.getDisplayOrder()
                                )
                        )
                        .toList();

        List<OnboardingResponse.EducationResponse> education = candidate.getEducation()
                        .stream()
                        .map(item ->
                                new OnboardingResponse.EducationResponse(
                                        item.getId(),
                                        item.getDegree(),
                                        item.getInstitution(),
                                        item.getFieldOfStudy(),
                                        item.getYearOfPassing(),
                                        item.getEducationLevel(),
                                        item.getDisplayOrder()
                                )
                        )
                        .toList();

        List<OnboardingResponse.CertificationResponse> certifications = candidate.getCertifications()
                        .stream()
                        .map(item ->
                                new OnboardingResponse.CertificationResponse(
                                        item.getId(),
                                        item.getName(),
                                        item.getIssuingOrganization(),
                                        item.getIssueDate(),
                                        item.getExpiryDate(),
                                        item.getDescription(),
                                        item.getDisplayOrder()
                                )
                        )
                        .toList();

        List<OnboardingResponse.AchievementResponse> achievements = candidate.getAchievements()
                        .stream()
                        .map(item ->
                                new OnboardingResponse.AchievementResponse(
                                        item.getId(),
                                        item.getTitle(),
                                        item.getDescription(),
                                        item.getDisplayOrder()
                                )
                        )
                        .toList();

        List<OnboardingResponse.ReferenceResponse> references = candidate.getReferences()
                        .stream()
                        .map(item ->
                                new OnboardingResponse.ReferenceResponse(
                                        item.getId(),
                                        item.getName(),
                                        item.getRelationship(),
                                        item.getContact(),
                                        item.getDisplayOrder()
                                )
                        )
                        .toList();

        return new OnboardingResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getEmploymentSituation(),

                experiences,
                education,
                certifications,
                achievements,
                references,

                candidate.getCurrentChallenge(),
                candidate.getGrowthAspiration(),
                candidate.getPlainLanguagePitch(),

                candidate.getFunctionalArea(),

                candidate.getWorkModePreference(),
                candidate.getRelocationPreference(),

                candidate.getNoticePeriod(),

                candidate.getCompensationRange(),
                candidate.isCompensationVisibleToRecruiters(),

                candidate.getLinkedinUrl(),

                candidate.getOnboardingCompletedAt()
        );
    }
}