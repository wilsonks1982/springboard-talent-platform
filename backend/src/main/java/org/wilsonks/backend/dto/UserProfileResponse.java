package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.User;

import java.util.UUID;

public record UserProfileResponse(
        UUID userId,
        String fullName,
        String email,
        String phone,
        String location,
        String employmentSituation,
        boolean emailVerified,
        boolean phoneVerified
) {

    public static UserProfileResponse of(User user) {

        return new UserProfileResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getLocation(),

                user.getEmploymentSituation() != null
                        ? user.getEmploymentSituation().name()
                        : null,

                user.isEmailVerified(),
                user.isPhoneVerified()
        );
    }
}