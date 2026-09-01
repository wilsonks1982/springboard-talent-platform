package org.wilsonks.backend.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Persistable;
import org.wilsonks.backend.domain.enums.OpenToRemote;
import org.wilsonks.backend.domain.enums.RelocationPreference;
import org.wilsonks.backend.domain.enums.WorkAuthorization;
import org.wilsonks.backend.domain.enums.WorkModePreference;

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

    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("uploadedAt DESC")
    private CandidateDocument resume;

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

    @Column(name = "compensation_range")
    private String compensationRange;

    @Column(name = "compensation_visible_to_recruiters")
    private boolean compensationVisibleToRecruiters = false;

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
