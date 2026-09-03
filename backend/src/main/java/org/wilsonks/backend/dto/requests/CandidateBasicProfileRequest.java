package org.wilsonks.backend.dto.requests;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.wilsonks.backend.domain.enums.JobSearchStatus;
import org.wilsonks.backend.domain.enums.NonEmploymentReason;

public record CandidateBasicProfileRequest(

        @NotBlank(message = "Full name is required")
        String fullName,

        @NotBlank(message = "Phone is required")
        String phone,

        @NotBlank(message = "City is required")
        String city,

        @NotBlank(message = "State / country is required")
        String stateCountry,

        @Pattern(
                regexp = "^$|https?://.+",
                message = "LinkedIn URL must be a valid URL"
        )
        String linkedinUrl,

        @NotNull(message = "Currently employed is required")
        Boolean currentlyEmployed,

        NonEmploymentReason nonEmploymentReason,

        JobSearchStatus jobSearchStatus

) {
}