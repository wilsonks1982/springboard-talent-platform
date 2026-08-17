package org.wilsonks.backend.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        UserResponse userResponse
){
    public static LoginResponse of(String accessToken, long expiresIn, UserResponse userResponse) {
        return new LoginResponse(
                accessToken,
                "Bearer",
                expiresIn,
                userResponse
        );
    }
}

