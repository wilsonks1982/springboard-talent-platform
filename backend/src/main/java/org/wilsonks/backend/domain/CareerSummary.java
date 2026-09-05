package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "candidate_career_summaries",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_candidate_career_summary",
                        columnNames = "candidate_user_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class CareerSummary {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "candidate_user_id",
            nullable = false
    )
    private Candidate candidate;

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String summary;
}