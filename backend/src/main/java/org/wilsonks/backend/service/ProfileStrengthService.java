package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.responses.ProfileStrengthResponse;
import org.wilsonks.backend.dto.responses.ProfileStrengthSectionResponse;
import org.wilsonks.backend.repository.CandidateIndustryRepository;
import org.wilsonks.backend.repository.CandidateSkillRepository;
import org.wilsonks.backend.repository.CandidatesRepository;
import org.wilsonks.backend.repository.CareerSummaryRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileStrengthService {

    private final CandidatesRepository candidatesRepository;
    private final CareerSummaryRepository careerSummaryRepository;
    private final CandidateIndustryRepository candidateIndustryRepository;
    private final CandidateSkillRepository candidateSkillRepository;

    @Transactional(readOnly = true)
    public ProfileStrengthResponse calculate(UUID userId) {

        Candidate candidate = candidatesRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Candidate profile not found."));

        boolean basicInformation = isBasicProfileComplete(candidate);

        boolean experience = candidate.getExperiences() != null && !candidate.getExperiences().isEmpty();

        boolean education = candidate.getEducation() != null && !candidate.getEducation().isEmpty();

        boolean careerDirection = isCareerDirectionComplete(candidate);

        boolean professionalSnapshot = isProfessionalSnapshotComplete(userId);


        List<ProfileStrengthSectionResponse> sections = List.of(

                section("BASIC_INFORMATION", "Basic information", 20, basicInformation),

                section("EXPERIENCE", "Experience", 25, experience),

                section("EDUCATION", "Education", 30, education),

                section("CAREER_DIRECTION", "Career direction", 15, careerDirection),

                section("PROFESSIONAL_SNAPSHOT",
                        "Professional Snapshot",
                        10,
                        professionalSnapshot
                )
        );
        int score = sections.stream().filter(ProfileStrengthSectionResponse::completed).mapToInt(ProfileStrengthSectionResponse::weight).sum();

        return new ProfileStrengthResponse(score, determineLevel(score), determineMessage(score), sections);
    }

    private ProfileStrengthSectionResponse section(String key, String label, int weight, boolean completed) {
        return new ProfileStrengthSectionResponse(key, label, weight, completed);
    }

    private boolean isBasicProfileComplete(Candidate candidate) {

        if (!hasText(candidate.getFullName())
                || !hasText(candidate.getPhone())
                || !hasText(candidate.getCity())
                || !hasText(candidate.getStateCountry())
                || candidate.getCurrentlyEmployed() == null) {
            return false;
        }

        if (Boolean.TRUE.equals(candidate.getCurrentlyEmployed())) {
            return candidate.getJobSearchStatus() != null;
        }

        return candidate.getNonEmploymentReason() != null;
    }

    private boolean isCareerDirectionComplete(Candidate candidate) {
        return hasText(candidate.getDesiredTitle())
                && candidate.getDesiredLocations() != null
                && !candidate.getDesiredLocations().isEmpty()
                && candidate.getOpenToRemote() != null
                && candidate.getNoticePeriod() != null
                && candidate.getNoticePeriod() >= 0
                && candidate.getWorkAuthorization() != null;
    }

    private boolean isProfessionalSnapshotComplete(UUID userId) {

        boolean hasCareerSummary =
                careerSummaryRepository.findByCandidateUserId(userId)
                        .map(summary -> hasText(summary.getSummary()))
                        .orElse(false);

        boolean hasIndustry =
                !candidateIndustryRepository
                        .findAllByCandidateUserId(userId)
                        .isEmpty();

        boolean hasSkill =
                !candidateSkillRepository
                        .findAllByCandidateUserId(userId)
                        .isEmpty();

        return hasCareerSummary
                && hasIndustry
                && hasSkill;
    }


    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private String determineLevel(int score) {

        if (score >= 90) {
            return "EXCELLENT";
        }

        if (score >= 70) {
            return "STRONG";
        }

        if (score >= 40) {
            return "GOOD";
        }

        return "GETTING_STARTED";
    }

    private String determineMessage(int score) {

        if (score >= 90) {
            return "Your profile is recruiter-ready.";
        }

        if (score >= 70) {
            return "You're building a strong profile.";
        }

        if (score >= 40) {
            return "Good progress. A few more details will strengthen your profile.";
        }

        return "Let's build your profile step by step.";
    }
}