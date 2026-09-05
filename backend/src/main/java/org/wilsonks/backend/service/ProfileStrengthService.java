package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.responses.ProfileStrengthResponse;
import org.wilsonks.backend.dto.responses.ProfileStrengthSectionResponse;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileStrengthService {

    private final CandidatesRepository candidatesRepository;

    @Transactional(readOnly = true)
    public ProfileStrengthResponse calculate(UUID userId) {

        Candidate candidate = candidatesRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Candidate profile not found."));

        boolean basicInformation = isBasicInformationComplete(candidate);

        boolean experience = candidate.getExperiences() != null && !candidate.getExperiences().isEmpty();

        boolean education = candidate.getEducation() != null && !candidate.getEducation().isEmpty();

        boolean careerDirection = isCareerDirectionComplete(candidate);

        boolean professionalPresence = isProfessionalPresenceComplete(candidate);

        List<ProfileStrengthSectionResponse> sections = List.of(

                section("BASIC_INFORMATION", "Basic information", 20, basicInformation),

                section("EXPERIENCE", "Experience", 25, experience),

                section("EDUCATION", "Education", 30, education),

                section("CAREER_DIRECTION", "Career direction", 15, careerDirection),

                section("PROFESSIONAL_PRESENCE", "Professional presence", 10, professionalPresence));

        int score = sections.stream().filter(ProfileStrengthSectionResponse::completed).mapToInt(ProfileStrengthSectionResponse::weight).sum();

        return new ProfileStrengthResponse(score, determineLevel(score), determineMessage(score), sections);
    }

    private ProfileStrengthSectionResponse section(String key, String label, int weight, boolean completed) {
        return new ProfileStrengthSectionResponse(key, label, weight, completed);
    }

    private boolean isBasicInformationComplete(Candidate candidate) {

        if (candidate.getUser() == null) {
            return false;
        }

        return hasText(candidate.getUser().getFullName()) && hasText(candidate.getUser().getEmail()) && hasText(candidate.getUser().getPhone()) && hasText(candidate.getUser().getLocation());
    }

    private boolean isCareerDirectionComplete(Candidate candidate) {

        return hasText(candidate.getGrowthAspiration()) || hasText(candidate.getFunctionalArea()) || hasText(candidate.getCurrentChallenge());
    }

    private boolean isProfessionalPresenceComplete(Candidate candidate) {

        return hasText(candidate.getLinkedinUrl());
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