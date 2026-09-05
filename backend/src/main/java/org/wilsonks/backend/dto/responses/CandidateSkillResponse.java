package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.CandidateSkill;

import java.util.UUID;

public record CandidateSkillResponse(
        UUID id,
        UUID skillTagId,
        String name,
        String code
) {

    public static CandidateSkillResponse of(
            CandidateSkill candidateSkill) {

        return new CandidateSkillResponse(
                candidateSkill.getId(),
                candidateSkill.getSkillTag().getId(),
                candidateSkill.getSkillTag().getName(),
                candidateSkill.getSkillTag().getCode()
        );
    }
}