package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "candidate_key_strengths")
@Getter
@Setter
@NoArgsConstructor
public class KeyStrength {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "candidate_user_id",
            nullable = false
    )
    private Candidate candidate;

    @Column(nullable = false, length = 200)
    private String strength;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;
}