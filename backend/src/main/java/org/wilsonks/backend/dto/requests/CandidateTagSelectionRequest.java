package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record CandidateTagSelectionRequest(

        @NotNull(message = "Tag IDs are required.")
        List<UUID> tagIds

) {
}