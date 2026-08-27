package org.wilsonks.backend.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.dto.*;
import org.wilsonks.backend.repository.CandidatesRepository;
import org.wilsonks.backend.repository.UsersRepository;
import org.wilsonks.backend.security.JwtService;

import java.util.Locale;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class AuthService {

    private final UsersRepository usersRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final VerificationService verification;
    private final CandidatesRepository candidatesRepo;

    @Transactional
    public RegisterResponse register(RegisterRequest registerRequest){

        // 1. Validate input
        // 2. Check duplicate email/phone
        String email=registerRequest.email().trim().toLowerCase(Locale.ROOT);
        String phone=normalize(registerRequest.phone());

        log.info("Registering user with email: {} and phone: {}", email, phone);

        if(!registerRequest.password().equals(registerRequest.confirmPassword())) {
            log.warn("Password and confirm password do not match for email: {}", email);
            throw new IllegalArgumentException("Passwords do not match.");
        }
        if(!registerRequest.password().matches(".*\\d.*")) {
            log.warn("Password does not contain a number for email: {}", email);
            throw new IllegalArgumentException("Password must contain at least one number.");
        }
        if(usersRepo.existsByEmailIgnoreCase(email)) {
            log.warn("An account with this email already exists: {}", email);
            throw new IllegalArgumentException("An account with this email already exists.");
        }
        if(usersRepo.existsByPhone(phone)) {
            log.warn("An account with this phone number already exists: {}", phone);
            throw new IllegalArgumentException("An account with this phone number already exists.");
        }

        // 3. Create User

        User user=new User();
        user.setFullName(registerRequest.fullName().trim());
        user.setEmail(email);
        user.setPhone(phone);
        user.setLocation(registerRequest.city().trim());
        user.setEmploymentSituation(registerRequest.employmentSituation());
        user.setPasswordHash(encoder.encode(registerRequest.password()));
        user.setEmailVerified(false);
        user.setPhoneVerified(false);

        user= usersRepo.save(user);

        // 4. Create Candidate
        Candidate candidate=new Candidate();
        candidate.setUserId(user.getUserId()); // Set the user ID for the candidate
        candidate.setUser(user); // Set the user for the candidate
        candidatesRepo.save(candidate);

        log.info("User and candidate registered successfully with ID: {}", user.getUserId());

        // 5. Continue existing registration flow

        verification.createEmail(user);

        String token=jwt.generate(user.getUserId(),user.getRole().name());


        return RegisterResponse.of(user, token, jwt.expires(), "VERIFICATION_PENDING");

    }

    public LoginResponse login(LoginRequest loginRequest){
        User user= usersRepo.findByEmailIgnoreCase(loginRequest.email().trim().toLowerCase()).orElseThrow(()->new BadCredentialsException("Invalid email or password."));

        if(!encoder.matches(loginRequest.password(),user.getPasswordHash()))throw new BadCredentialsException("Invalid email or password.");

        return new LoginResponse(
                jwt.generate(user.getUserId(),user.getRole().name()),
                "Bearer",
                jwt.expires(),
                UserResponse.of(user)
        );

    }

    public UserResponse me(UUID id){
        User user = usersRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found."));

        return UserResponse.of(user);

    }

    public User getUserById(UUID id){
        return usersRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public static String normalize(String p){
        return p.replaceAll("[()\\s-]","");
    }
}
