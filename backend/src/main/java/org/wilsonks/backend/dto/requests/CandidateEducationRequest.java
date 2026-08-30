package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CandidateEducationRequest(

        @NotBlank(message = "Degree is required")
        String degree,

        @NotBlank(message = "Institution is required")
        String institution,

        String fieldOfStudy,

        @Min(value = 1900, message = "Year of passing is invalid")
        @Max(value = 2100, message = "Year of passing is invalid")
        Integer yearOfPassing,

        @NotBlank(message = "Education level is required")
        String educationLevel
) {
}