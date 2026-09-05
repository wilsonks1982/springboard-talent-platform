package org.wilsonks.backend.dto.responses;

import java.math.BigDecimal;
import java.util.List;

public record ProfessionalSnapshotResponse(

        String currentTitle,

        String currentCompany,

        BigDecimal yearsExperience,

        List<CandidateExperienceResponse> employmentHistory,

        List<IndustryTagResponse> industryTags,

        List<SkillTagResponse> skillTags,

        List<KeyStrengthResponse> keyStrengths,

        List<CandidateEducationResponse> education,

        List<CandidateCertificationResponse> certifications,

        CareerSummaryResponse careerSummary,

        List<NotableAchievementResponse> notableAchievements
) {
}