package org.wilsonks.backend.employer.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.employer.domain.enums.EmployerCompanyIndustry;
import org.wilsonks.backend.employer.domain.enums.EmployerCompanySize;

import java.util.UUID;

@Entity
@Table(name = "employer_companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployerCompany {

    @Id
    @GeneratedValue
    @Column(name = "company_id", nullable = false, updatable = false)
    private UUID companyId;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Enumerated(EnumType.STRING)
    @Column(name = "industry", nullable = false)
    private EmployerCompanyIndustry industry;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_size")
    private EmployerCompanySize companySize;

    @Column(name = "website")
    private String website;

    @Column(name = "primary_contact_name", nullable = false)
    private String primaryContactName;

    @Column(name = "primary_contact_email", nullable = false)
    private String primaryContactEmail;

    @Column(name = "primary_contact_phone")
    private String primaryContactPhone;

    @Column(name = "invite_code")
    private String inviteCode;

    @Column(name = "invited_by")
    private String invitedBy;

    @Column(name = "account_active", nullable = false)
    private boolean accountActive = true;
}