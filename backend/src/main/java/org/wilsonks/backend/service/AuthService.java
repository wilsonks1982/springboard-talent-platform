package org.wilsonks.backend.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.dto.*;
import org.wilsonks.backend.repository.UsersRepository;

import java.util.Locale;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

    private final UsersRepository users;
    private final PasswordEncoder enc;
    private final JwtService jwt;
    private final VerificationService verification;

    @Transactional
    public RegisterResponse register(RegisterRequest registerRequest){
        String email=registerRequest.email().trim().toLowerCase(Locale.ROOT),phone=normalize(registerRequest.phone());

        if(!registerRequest.password().equals(registerRequest.confirmPassword()))throw new IllegalArgumentException("Passwords do not match.");
        if(!registerRequest.password().matches(".*\\d.*"))throw new IllegalArgumentException("Password must contain at least one number.");
        if(users.existsByEmailIgnoreCase(email))throw new IllegalArgumentException("An account with this email already exists.");
        if(users.existsByPhone(phone))throw new IllegalArgumentException("An account with this phone number already exists.");

        User user=new User();
        user.setFullName(registerRequest.fullName().trim());
        user.setEmail(email);
        user.setPhone(phone);
        user.setLocation(registerRequest.city().trim());
        user.setEmploymentSituation(registerRequest.employmentSituation());
        user.setPasswordHash(enc.encode(registerRequest.password()));
        user.setEmailVerified(false);
        user.setPhoneVerified(false);

        user=users.save(user);

        verification.createEmail(user);
        String token=jwt.generate(user.getUserId(),user.getRole().name());


        return RegisterResponse.of(user, token, jwt.expires(), "VERIFICATION_PENDING");

    }


    public LoginResponse login(LoginRequest loginRequest){
        User user=users.findByEmailIgnoreCase(loginRequest.email().trim().toLowerCase()).orElseThrow(()->new BadCredentialsException("Invalid email or password."));

        if(!enc.matches(loginRequest.password(),user.getPasswordHash()))throw new BadCredentialsException("Invalid email or password.");

        return new LoginResponse(
                jwt.generate(user.getUserId(),user.getRole().name()),
                "Bearer",
                jwt.expires(),
                UserResponse.of(user)
        );

    }

    public UserResponse me(UUID id){
        User user = users.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found."));

        return UserResponse.of(user);

    }

    public User getUserById(UUID id){
        return users.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public static String normalize(String p){
        return p.replaceAll("[()\\s-]","");
    }
}
