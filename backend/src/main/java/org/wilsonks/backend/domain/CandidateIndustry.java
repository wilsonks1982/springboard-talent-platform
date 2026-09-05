package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(
        name = "candidate_industries",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_candidate_industry",
                        columnNames = {
                                "candidate_user_id",
                                "industry_tag_id"
                        }
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class CandidateIndustry {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "candidate_user_id",
            nullable = false
    )
    private Candidate candidate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "industry_tag_id",
            nullable = false
    )
    private IndustryTag industryTag;
}