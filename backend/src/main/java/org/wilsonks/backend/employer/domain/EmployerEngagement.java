package org.wilsonks.backend.employer.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementStatus;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementType;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "employer_engagements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployerEngagement {

    @Id
    @GeneratedValue
    @Column(name = "engagement_id", nullable = false, updatable = false)
    private UUID engagementId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private EmployerCompany company;

    @Enumerated(EnumType.STRING)
    @Column(name = "engagement_type", nullable = false)
    private EmployerEngagementType engagementType;

    @Column(name = "context", length = 2000)
    private String context;

    @Column(name = "fee_tier_agreement_accepted", nullable = false)
    private boolean feeTierAgreementAccepted = false;

    @Column(name = "fee_tier_agreement_accepted_at")
    private LocalDateTime feeTierAgreementAcceptedAt;

    @Column(name = "first_placement_used", nullable = false)
    private boolean firstPlacementUsed = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "engagement_status", nullable = false)
    private EmployerEngagementStatus engagementStatus = EmployerEngagementStatus.PENDING_VERIFICATION;
}
