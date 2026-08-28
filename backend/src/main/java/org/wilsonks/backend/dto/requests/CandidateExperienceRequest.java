package org.wilsonks.backend.dto.requests;

import java.time.LocalDate;

public record CandidateExperienceRequest(
        String companyName,
        String jobTitle,
        LocalDate startDate,
        LocalDate endDate,
        boolean current,
        String description
) {}