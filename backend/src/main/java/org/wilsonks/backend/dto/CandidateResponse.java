package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.responses.CandidateAchievementResponse;
import org.wilsonks.backend.dto.responses.CandidateCertificationResponse;
import org.wilsonks.backend.dto.responses.CandidateEducationResponse;
import org.wilsonks.backend.dto.responses.CandidateExperienceResponse;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record CandidateResponse(
        UserProfileResponse user,

        String currentChallenge,
        String growthAspiration,
        String plainLanguagePitch,
        String functionalArea,
        String workModePreference,
        String relocationPreference,
        String noticePeriod,
        String compensationRange,
        boolean compensationVisibleToRecruiters,
        String linkedinUrl,
        OffsetDateTime onboardingCompletedAt,

        List<CandidateExperienceResponse> experiences,
        List<CandidateEducationResponse> education,
        List<CandidateCertificationResponse> certifications,
        List<CandidateAchievementResponse> achievements,
        List<CandidateReferenceResponse> references,

        CandidateDocumentResponse resume
) {

    public static CandidateResponse of(
            Candidate candidate
    ) {

        return new CandidateResponse(
                UserProfileResponse.of(candidate.getUser()),

                candidate.getCurrentChallenge(),
                candidate.getGrowthAspiration(),
                candidate.getPlainLanguagePitch(),
                candidate.getFunctionalArea(),

                candidate.getWorkModePreference() != null
                        ? candidate.getWorkModePreference().name()
                        : null,

                candidate.getRelocationPreference() != null
                        ? candidate.getRelocationPreference().name()
                        : null,

                candidate.getNoticePeriod(),
                candidate.getCompensationRange(),
                candidate.isCompensationVisibleToRecruiters(),
                candidate.getLinkedinUrl(),
                candidate.getOnboardingCompletedAt(),

                candidate.getExperiences()
                        .stream()
                        .map(CandidateExperienceResponse::of)
                        .toList(),

                candidate.getEducation()
                        .stream()
                        .map(CandidateEducationResponse::of)
                        .toList(),

                candidate.getCertifications()
                        .stream()
                        .map(CandidateCertificationResponse::of)
                        .toList(),

                candidate.getAchievements()
                        .stream()
                        .map(CandidateAchievementResponse::of)
                        .toList(),

                candidate.getReferences()
                        .stream()
                        .map(CandidateReferenceResponse::of)
                        .toList(),

                candidate.getResume() != null
                        ? CandidateDocumentResponse.of(
                        candidate.getResume()
                )
                        : null
        );
    }







    public record CandidateReferenceResponse(
            UUID id,
            String name,
            String relationship,
            String contact,
            int displayOrder
    ) {
        public static CandidateReferenceResponse of(
                org.wilsonks.backend.domain.CandidateReference reference
        ) {
            return new CandidateReferenceResponse(
                    reference.getId(),
                    reference.getName(),
                    reference.getRelationship(),
                    reference.getContact(),
                    reference.getDisplayOrder()
            );
        }
    }

}
