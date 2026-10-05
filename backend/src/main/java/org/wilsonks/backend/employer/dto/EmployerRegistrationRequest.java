package org.wilsonks.backend.employer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.wilsonks.backend.employer.domain.enums.EmployerCompanyIndustry;
import org.wilsonks.backend.employer.domain.enums.EmployerCompanySize;

public record EmployerRegistrationRequest(

        // Employer user / account
        @NotBlank(message = "Full name is required")
        @Size(max = 255, message = "Full name must not exceed 255 characters")
        String fullName,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email address")
        @Size(max = 255, message = "Email must not exceed 255 characters")
        String email,

        @NotBlank(message = "Phone is required")
        @Size(max = 255, message = "Phone must not exceed 255 characters")
        String phone,

        @NotBlank(message = "Password is required")
        @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
        String password,

        // Employer company
        @NotBlank(message = "Company name is required")
        @Size(max = 255, message = "Company name must not exceed 255 characters")
        String companyName,

        @NotNull(message = "Industry is required")
        EmployerCompanyIndustry industry,

        EmployerCompanySize companySize,

        @Size(max = 500, message = "Website must not exceed 500 characters")
        String website,

        @NotBlank(message = "Primary contact name is required")
        @Size(max = 255, message = "Primary contact name must not exceed 255 characters")
        String primaryContactName,

        @Size(max = 255, message = "Primary contact email must not exceed 255 characters")
        @Email(message = "Enter a valid primary contact email")
        String primaryContactEmail,

        @Size(max = 255, message = "Primary contact phone must not exceed 255 characters")
        String primaryContactPhone
) {
}