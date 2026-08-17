package org.wilsonks.backend.dto;

import jakarta.validation.constraints.*;
import org.wilsonks.backend.domain.enums.EmploymentSituation;

public record RegisterRequest(
        @NotBlank String fullName,
        @NotBlank @Email String email,
        @NotBlank @Pattern(regexp="^\\+?[0-9]{7,15}$") String phone,
        @NotBlank String city,
        @NotBlank @Size(min=8,max=100) String password,
        @NotBlank String confirmPassword,
        @NotNull EmploymentSituation employmentSituation
){}
