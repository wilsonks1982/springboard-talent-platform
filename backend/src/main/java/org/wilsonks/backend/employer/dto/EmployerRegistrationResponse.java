package org.wilsonks.backend.employer.dto;

import java.util.UUID;

public record EmployerRegistrationResponse(
        UUID userId,
        UUID companyId,
        UUID membershipId,
        String fullName,
        String email,
        String companyName,
        String token,
        String tokenType,
        long expiresIn
) {}