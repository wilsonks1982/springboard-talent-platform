package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.SkillTag;

import java.util.UUID;

public record SkillTagResponse(
        UUID id,
        String name,
        String code
) {

    public static SkillTagResponse of(
            SkillTag tag) {

        return new SkillTagResponse(
                tag.getId(),
                tag.getName(),
                tag.getCode()
        );
    }
}