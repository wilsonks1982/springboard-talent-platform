package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "candidate_education")
@Getter
@Setter
@NoArgsConstructor
public class CandidateEducation {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "candidate_user_id", nullable = false)
    private Candidate candidate;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String institution;

    @Column(name = "field_of_study")
    private String fieldOfStudy;

    @Column(name = "year_of_passing")
    private Integer yearOfPassing;

    @Column(name = "education_level")
    private String educationLevel;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;
}