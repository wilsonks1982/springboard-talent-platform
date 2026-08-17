package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.domain.enums.EmploymentSituation;

import java.util.UUID;

public record UserResponse(
        UUID userId,
        String fullName,
        String email,
        String phone,
        String city,
        EmploymentSituation employmentSituation,
        boolean emailVerified,
        boolean phoneVerified,
        String role
){
    public static UserResponse of(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getLocation(),
                user.getEmploymentSituation(),
                user.isEmailVerified(),
                user.isPhoneVerified(),
                user.getRole().name()
        );
    }
}
