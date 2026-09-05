package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.IndustryTag;

import java.util.UUID;

public record IndustryTagResponse(
        UUID id,
        String name,
        String code
) {

    public static IndustryTagResponse of(
            IndustryTag tag) {

        return new IndustryTagResponse(
                tag.getId(),
                tag.getName(),
                tag.getCode()
        );
    }
}