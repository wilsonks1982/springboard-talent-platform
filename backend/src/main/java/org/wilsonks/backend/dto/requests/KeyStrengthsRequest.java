package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record KeyStrengthsRequest(

        @NotNull(message = "Strengths are required.")
        List<String> strengths

) {
}