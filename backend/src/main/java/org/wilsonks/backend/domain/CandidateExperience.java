package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.domain.enums.ManagementType;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "candidate_experiences")
@Getter
@Setter
@NoArgsConstructor
public class CandidateExperience {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "candidate_user_id", nullable = false)
    private Candidate candidate;

    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;

    @Column(name = "job_title", nullable = false, length = 200)
    private String jobTitle;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "reported_to_title", length = 200)
    private String reportedToTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "management_type", nullable = false, length = 40)
    private ManagementType managementType;

    @Column(name = "team_size")
    private Integer teamSize;

    @Column(name = "reason_for_leaving", length = 500)
    private String reasonForLeaving;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;
}