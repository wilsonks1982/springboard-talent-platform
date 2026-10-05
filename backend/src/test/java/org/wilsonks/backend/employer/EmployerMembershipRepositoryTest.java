package org.wilsonks.backend.employer;


import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.domain.enums.EmploymentSituation;
import org.wilsonks.backend.domain.enums.Role;
import org.wilsonks.backend.employer.domain.EmployerCompany;
import org.wilsonks.backend.employer.domain.EmployerMembership;
import org.wilsonks.backend.employer.domain.enums.EmployerCompanyIndustry;
import org.wilsonks.backend.employer.domain.enums.EmployerCompanySize;
import org.wilsonks.backend.employer.domain.enums.EmployerMembershipRole;
import org.wilsonks.backend.employer.repository.EmployerCompanyRepository;
import org.wilsonks.backend.employer.repository.EmployerMembershipRepository;
import org.wilsonks.backend.repository.UsersRepository;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Slf4j
public class EmployerMembershipRepositoryTest {

    @Autowired
    private UsersRepository usersRepo;

    @Autowired
    private EmployerCompanyRepository employerCompanyRepository;

    @Autowired
    private EmployerMembershipRepository employerMembershipRepository;

    @Test
    public void shouldPersistEmployerMembershipWithCompanyAndUser() {
        //Create a User
        User user = new User();

        user.setFullName("Employer Admin");
        user.setEmail("employer-admin-" + UUID.randomUUID() + "@example.com");
        user.setPhone("9000" + String.format("%06d", (int) (Math.random() * 1_000_000)));
        user.setLocation("Bengaluru");
        user.setEmploymentSituation(EmploymentSituation.CURRENTLY_EMPLOYED);
        user.setPasswordHash("test-password-hash");
        user.setEmailVerified(true);
        user.setPhoneVerified(true);
        user.setRole(Role.COMPANY);

        User savedUser = usersRepo.save(user);

        log.info("Saved User Id: {}", savedUser.getUserId());
        log.info("Saved User Full Name: {}", savedUser.getFullName());
        log.info("Saved User Email: {}", savedUser.getEmail());
        log.info("Saved User Phone: {}", savedUser.getPhone());


        //Create an Employer Company
        EmployerCompany company = new EmployerCompany();

        company.setCompanyName("Springboard Technologies");
        company.setIndustry(EmployerCompanyIndustry.SOFTWARE);
        company.setCompanySize(EmployerCompanySize.STARTUP);
        company.setWebsite("https://springboard.example.com");
        company.setPrimaryContactName("Employer Admin");
        company.setPrimaryContactEmail(savedUser.getEmail());
        company.setPrimaryContactPhone(savedUser.getPhone());

        EmployerCompany savedCompany = employerCompanyRepository.save(company);

        log.info("Saved Company Id: {}", savedCompany.getCompanyId());
        log.info("Saved Company Name: {}", savedCompany.getCompanyName());
        log.info("Saved Company Email: {}", savedCompany.getPrimaryContactEmail());
        log.info("Saved Company Phone: {}", savedCompany.getPrimaryContactPhone());


        //Create an Employer Membership linking the User and Company
        EmployerMembership membership = new EmployerMembership();

        membership.setCompany(savedCompany);
        membership.setUser(savedUser);
        membership.setRole(EmployerMembershipRole.COMPANY_ADMIN);

        EmployerMembership savedMembership = employerMembershipRepository.save(membership);

        // 4. Verify membership
        assertThat(savedMembership.getMembershipId()).isNotNull();
        assertThat(savedMembership.isActive()).isTrue();

        assertThat(savedMembership.getCompany()).isNotNull();
        assertThat(savedMembership.getCompany().getCompanyId()).isEqualTo(savedCompany.getCompanyId());

        assertThat(savedMembership.getUser()).isNotNull();
        assertThat(savedMembership.getUser().getUserId()).isEqualTo(savedUser.getUserId());

        assertThat(savedMembership.getRole()).isEqualTo(EmployerMembershipRole.COMPANY_ADMIN);

        assertThat(savedMembership.getCreatedAt()).isNotNull();
        assertThat(savedMembership.getUpdatedAt()).isNotNull();
    }
}
