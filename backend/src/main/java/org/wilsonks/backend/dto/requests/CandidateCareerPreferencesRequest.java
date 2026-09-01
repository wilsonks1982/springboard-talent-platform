package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

import org.wilsonks.backend.domain.enums.OpenToRemote;
import org.wilsonks.backend.domain.enums.WorkAuthorization;

public record CandidateCareerPreferencesRequest(

        @NotBlank(message = "Desired title is required")
        String desiredTitle,

        List<String> desiredIndustries,

        @NotEmpty(message = "At least one desired location is required")
        List<String> desiredLocations,

        @NotNull(message = "Work preference is required")
        OpenToRemote openToRemote,

        @NotNull(message = "Notice period is required")
        Integer noticePeriod,

        @NotNull(message = "Work authorization is required")
        WorkAuthorization workAuthorization,

        List<String> languages

) {
}