package org.wilsonks.backend.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Persistable;
import org.wilsonks.backend.domain.enums.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/*
For a shared-primary-key entity like Candidate, making Candidate implement Persistable<UUID> so Spring Data knows that
a newly-created Candidate is new even though its ID is already assigned.
 */
@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
public class Candidate implements Persistable<UUID> {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "city")
    private String city;

    @Column(name = "state_country")
    private String stateCountry;

    @Enumerated(EnumType.STRING)
    @Column(name = "non_employment_reason")
    private NonEmploymentReason nonEmploymentReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_search_status")
    private JobSearchStatus jobSearchStatus;

    @Column(name = "currently_employed")
    private Boolean currentlyEmployed;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<CandidateExperience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<CandidateEducation> education = new ArrayList<>();

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<CandidateCertification> certifications = new ArrayList<>();

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<CandidateAchievement> achievements = new ArrayList<>();

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<CandidateReference> references = new ArrayList<>();

    @Column(name = "desired_title")
    private String desiredTitle;

    @ElementCollection
    @CollectionTable(name = "candidate_desired_industries", joinColumns = @JoinColumn(name = "candidate_user_id"))
    @Column(name = "industry")
    private List<String> desiredIndustries = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "candidate_desired_locations", joinColumns = @JoinColumn(name = "candidate_user_id"))
    @Column(name = "location")
    private List<String> desiredLocations = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "open_to_remote")
    private OpenToRemote openToRemote;

    @Column(name = "notice_period")
    private Integer noticePeriod;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_authorization")
    private WorkAuthorization workAuthorization;

    @ElementCollection
    @CollectionTable(name = "candidate_languages", joinColumns = @JoinColumn(name = "candidate_user_id"))
    @Column(name = "language")
    private List<String> languages = new ArrayList<>();

    @Column(name = "current_challenge")
    private String currentChallenge;

    @Column(name = "growth_aspiration")
    private String growthAspiration;

    @Column(name = "plain_language_pitch")
    private String plainLanguagePitch;

    @Column(name = "functional_area")
    private String functionalArea;

    @Enumerated(EnumType.STRING)
    @Column(name = "work_mode_preference")
    private WorkModePreference workModePreference;

    @Enumerated(EnumType.STRING)
    @Column(name = "relocation_preference")
    private RelocationPreference relocationPreference;

    @Column(name = "current_ctc", precision = 15, scale = 2)
    private BigDecimal currentCtc;

    @Column(name = "current_ctc_band")
    private String currentCtcBand;

    @Column(name = "expected_ctc", precision = 15, scale = 2)
    private BigDecimal expectedCtc;

    @Column(name = "expected_ctc_band")
    private String expectedCtcBand;

    @Enumerated(EnumType.STRING)
    @Column(name = "compensation_visibility")
    private CompensationVisibility compensationVisibility =
            CompensationVisibility.HIDDEN;

    // -------------------------------------------------------------------------
    // Employment Verification — Springboard internal/private
    // -------------------------------------------------------------------------

    @Column(name = "last_increment_letter_url")
    private String lastIncrementLetterUrl;

    @Column(name = "variable_pay_letter_url")
    private String variablePayLetterUrl;

    @Column(name = "relieving_letter_url")
    private String relievingLetterUrl;

    @Column(name = "other_supporting_document_url")
    private String otherSupportingDocumentUrl;

    // Verification contacts — private to Springboard
    @Column(name = "reporting_manager_name")
    private String reportingManagerName;

    @Column(name = "reporting_manager_phone")
    private String reportingManagerPhone;

    @Column(name = "reporting_manager_email")
    private String reportingManagerEmail;

    @Column(name = "hr_contact_name")
    private String hrContactName;

    @Column(name = "hr_contact_phone")
    private String hrContactPhone;

    @Column(name = "hr_contact_email")
    private String hrContactEmail;

    @Column(name = "hr_contact_bd_disclosure_acknowledged")
    private Boolean hrContactBdDisclosureAcknowledged;

    @Column(name = "hr_contact_bd_disclosure_acknowledged_at")
    private OffsetDateTime hrContactBdDisclosureAcknowledgedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_verification_status")
    private EmploymentVerificationStatus employmentVerificationStatus =
            EmploymentVerificationStatus.NOT_VERIFIED;

    @Column(name = "verification_triggered_at")
    private OffsetDateTime verificationTriggeredAt;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "onboarding_completed_at")
    private OffsetDateTime onboardingCompletedAt;

    @Transient
    private boolean newEntity = true;

    @Override
    public UUID getId() {
        return userId;
    }

    @Override
    public boolean isNew() {
        return newEntity;
    }

    @PostPersist
    @PostLoad
    private void markNotNew() {
        this.newEntity = false;
    }
}
