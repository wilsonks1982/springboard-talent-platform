package org.wilsonks.backend.employer.service;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.domain.enums.EmploymentSituation;
import org.wilsonks.backend.domain.enums.Role;
import org.wilsonks.backend.employer.domain.EmployerCompany;
import org.wilsonks.backend.employer.domain.EmployerMembership;
import org.wilsonks.backend.employer.domain.enums.EmployerMembershipRole;
import org.wilsonks.backend.employer.dto.EmployerRegistrationRequest;
import org.wilsonks.backend.employer.dto.EmployerRegistrationResponse;
import org.wilsonks.backend.employer.repository.EmployerCompanyRepository;
import org.wilsonks.backend.employer.repository.EmployerMembershipRepository;
import org.wilsonks.backend.repository.UsersRepository;
import org.wilsonks.backend.security.JwtService;

import java.util.Locale;

@Slf4j
@Service
@AllArgsConstructor
public class EmployerRegistrationService {

    private final UsersRepository usersRepo;
    private final EmployerCompanyRepository employerCompanyRepository;
    private final EmployerMembershipRepository employerMembershipRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    @Transactional
    public EmployerRegistrationResponse register(EmployerRegistrationRequest request) {

        // 1. Normalize account data
        String email = request.email().trim().toLowerCase(Locale.ROOT);

        String phone = normalize(request.phone());

        log.info("Registering employer with email: {} and phone: {}", email, phone);

        // 2. Validate duplicate account
        if (usersRepo.existsByEmailIgnoreCase(email)) {
            log.warn("Employer registration rejected. Email already exists: {}", email);

            throw new IllegalArgumentException("An account with this email already exists.");
        }

        if (usersRepo.existsByPhone(phone)) {
            log.warn("Employer registration rejected. Phone already exists: {}", phone);

            throw new IllegalArgumentException("An account with this phone number already exists.");
        }

        // 3. Validate password policy
        if (!request.password().matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must contain at least one number.");
        }

        // 4. Create User
        User user = new User();

        user.setFullName(request.fullName().trim());
        user.setEmail(email);
        user.setPhone(phone);

        /*
         * User currently requires employmentSituation.
         * An employer account represents someone currently working
         * for the company they are registering.
         */
        user.setEmploymentSituation(EmploymentSituation.CURRENTLY_EMPLOYED);

        user.setLocation("Bengaluru"); // Default location for employer accounts
        user.setPasswordHash(encoder.encode(request.password()));

        user.setEmailVerified(false);
        user.setPhoneVerified(false);
        user.setRole(Role.COMPANY);

        User savedUser = usersRepo.save(user);

        // 5. Create Employer Company
        EmployerCompany company = new EmployerCompany();

        company.setCompanyName(request.companyName().trim());
        company.setIndustry(request.industry());
        company.setCompanySize(request.companySize());

        company.setWebsite(request.website() == null || request.website().isBlank() ? null : request.website().trim());

        company.setPrimaryContactName(request.fullName());
        company.setPrimaryContactEmail(request.email());
        company.setPrimaryContactPhone(request.phone());

        company.setInviteCode(request.inviteCode() == null || request.inviteCode().isBlank() ? null : request.inviteCode().trim());
        company.setInvitedBy(null); // This can be set later if needed
        company.setAccountActive(true); // New employer accounts are active by default

        EmployerCompany savedCompany = employerCompanyRepository.save(company);

        // 6. Create Employer Membership
        EmployerMembership membership = new EmployerMembership();

        membership.setCompany(savedCompany);
        membership.setUser(savedUser);
        membership.setRole(EmployerMembershipRole.COMPANY_ADMIN);
        membership.setActive(true);

        EmployerMembership savedMembership = employerMembershipRepository.save(membership);

        log.info("Employer registered successfully. userId={}, companyId={}, membershipId={}", savedUser.getUserId(), savedCompany.getCompanyId(), savedMembership.getMembershipId());

        String token = jwt.generate(
                savedUser.getUserId(),
                savedUser.getRole().name()
        );

        // 7. Return registration response
        return new EmployerRegistrationResponse(
                savedUser.getUserId(),
                savedCompany.getCompanyId(),
                savedMembership.getMembershipId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedCompany.getCompanyName(),
                token,
                "Bearer",
                jwt.expires()
        );
    }

    private String normalize(String phone) {
        return phone.replaceAll("[()\\s-]", "");
    }
}