package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.responses.*;

import java.time.OffsetDateTime;
import java.util.List;

public record CandidateResponse(UserProfileResponse user,
                                String currentChallenge,
                                String growthAspiration,
                                String plainLanguagePitch,
                                String functionalArea,
                                String workModePreference,
                                String relocationPreference,

                                CandidateCompensationResponse compensation,

                                String linkedinUrl, OffsetDateTime onboardingCompletedAt,

                                CandidateCareerPreferencesResponse careerPreferences,

                                List<CandidateExperienceResponse> experiences,
                                List<CandidateEducationResponse> education,
                                List<CandidateCertificationResponse> certifications,
                                List<CandidateAchievementResponse> achievements,
                                List<CandidateReferenceResponse> references,

                                CandidateDocumentResponse resume) {

    public static CandidateResponse of(Candidate candidate, CandidateDocumentResponse resume) {

        return new CandidateResponse(UserProfileResponse.of(
                candidate.getUser()),
                candidate.getCurrentChallenge(),
                candidate.getGrowthAspiration(),
                candidate.getPlainLanguagePitch(),
                candidate.getFunctionalArea(),
                candidate.getWorkModePreference() != null ? candidate.getWorkModePreference().name() : null,
                candidate.getRelocationPreference() != null ? candidate.getRelocationPreference().name() : null,

                CandidateCompensationResponse.of(candidate),

                candidate.getLinkedinUrl(),
                candidate.getOnboardingCompletedAt(),

                CandidateCareerPreferencesResponse.of(candidate),

                candidate.getExperiences().stream().map(CandidateExperienceResponse::of).toList(),

                candidate.getEducation().stream().map(CandidateEducationResponse::of).toList(),

                candidate.getCertifications().stream().map(CandidateCertificationResponse::of).toList(),

                candidate.getAchievements().stream().map(CandidateAchievementResponse::of).toList(),

                candidate.getReferences().stream().map(CandidateReferenceResponse::of).toList(),
                resume
        );

    }
}