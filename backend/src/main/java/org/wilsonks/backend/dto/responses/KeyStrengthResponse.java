package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.KeyStrength;

import java.util.UUID;

public record KeyStrengthResponse(
        UUID id,
        String strength,
        int displayOrder
) {

    public static KeyStrengthResponse of(
            KeyStrength keyStrength) {

        return new KeyStrengthResponse(
                keyStrength.getId(),
                keyStrength.getStrength(),
                keyStrength.getDisplayOrder()
        );
    }
}