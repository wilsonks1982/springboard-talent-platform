package org.wilsonks.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record ConfirmFieldsRequest(
        @NotEmpty(message = "At least one experience is required.")
        @Valid List<ExperienceRequest> experiences

) {
    public record ExperienceRequest(
            /*
            Why allow id in the request? Because eventually the same API can support:
            1. Creating a new experience (id will be null)
            2. Updating an existing experience (id will be provided)
            3. Deleting an existing experience (id will be provided, but other fields can be null)
            4. Reordering experiences (id will be provided, but other fields can be null)
             */

            UUID id,

            @NotBlank(message = "Company name is required.")
            String companyName,

            @NotBlank(message = "Job title is required.")
            String jobTitle,

            LocalDate startDate,

            LocalDate endDate,

            boolean current,

            String description,

            int displayOrder

    ) {}
}
