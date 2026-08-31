package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record CandidateReferenceRequest(

        @NotBlank(message = "Reference name is required")
        String name,

        String relationship,

        String contact

) {
}