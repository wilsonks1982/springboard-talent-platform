package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.User;

import java.util.UUID;

public record RegisterResponse(
        UUID userId,
        String email,
        String phone,
        boolean emailVerified,
        boolean phoneVerified,
        String registrationStatus,
        String accessToken,
        long expiresIn){
    public static RegisterResponse of(User user, String accessToken, long expiresIn, String registrationStatus) {
        return new RegisterResponse(
                user.getUserId(),
                user.getEmail(),
                user.getPhone(),
                user.isEmailVerified(),
                user.isPhoneVerified(),
                registrationStatus,
                accessToken,
                expiresIn
        );
    }
}
