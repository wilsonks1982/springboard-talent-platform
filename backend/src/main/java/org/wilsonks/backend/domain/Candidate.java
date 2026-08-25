package org.wilsonks.backend.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.domain.enums.RelocationPreference;
import org.wilsonks.backend.domain.enums.WorkModePreference;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "current_company")
    private String currentCompany;

    @Column(name = "current_job_role")
    private String currentRole;

    @Column(name = "years_experience")
    private String yearsExperience;

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

    @Column(name = "notice_period")
    private String noticePeriod;

    @Column(name = "compensation_range")
    private String compensationRange;

    @Column(name = "compensation_visible_to_recruiters")
    private boolean compensationVisibleToRecruiters = false;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "onboarding_completed_at")
    private OffsetDateTime onboardingCompletedAt;

}
