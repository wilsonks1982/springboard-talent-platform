package org.wilsonks.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.domain.enums.VerificationChannel;
import org.wilsonks.backend.domain.enums.VerificationPurpose;
import org.wilsonks.backend.dto.*;
import org.wilsonks.backend.service.AuthService;
import org.wilsonks.backend.service.RegistrationStatusService;
import org.wilsonks.backend.service.VerificationService;

import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService auth;
    private final VerificationService verification;
    private final RegistrationStatusService status;

    @PostMapping("/register")
    public RegisterResponse register(@Valid @RequestBody RegisterRequest registerRequest){
        return auth.register(registerRequest);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest loginRequest){
        return auth.login(loginRequest);
    }

    @GetMapping("/me")
    public UserResponse me(Authentication a){
        return auth.me((UUID)a.getPrincipal());
    }

    @PostMapping("/logout")
    public Map<String,String> logout(){
        return Map.of("message","Logged out successfully");
    }

    @GetMapping("/registration/status")
    public RegistrationStatusResponse status(Authentication a){
        return status.get((UUID)a.getPrincipal());
    }


    @PostMapping("/email/verify")
    public Map<String,Object> verifyEmail(Authentication a,@Valid @RequestBody Code c){
        verification.verify(
                (UUID)a.getPrincipal(),
                VerificationChannel.EMAIL,
                VerificationPurpose.EMAIL_VERIFICATION,
                c.code()
        );
        return Map.of("verified",true,"emailVerified",true);
    }

    @PostMapping("/email/resend")
    public Map<String,String> resend(Authentication a){
        verification.resendEmail((UUID)a.getPrincipal());

        return Map.of("message","Verification email sent");
    }

    @PostMapping("/phone/send-otp")
    public Map<String,Object> sendOtp(Authentication a){
        verification.sendOtp((UUID)a.getPrincipal());
        return Map.of("message","OTP sent","expiresInSeconds",600);
    }

    @PostMapping("/phone/verify-otp")
    public Map<String,Object> verifyOtp(Authentication a,@Valid @RequestBody Code c){
        verification.verify(
                (UUID)a.getPrincipal(),
                VerificationChannel.PHONE,
                VerificationPurpose.PHONE_VERIFICATION,
                c.code()
        );
        return Map.of("verified",true,"phoneVerified",true);
    }
}

