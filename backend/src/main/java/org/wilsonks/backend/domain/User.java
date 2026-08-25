package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.domain.enums.EmploymentSituation;
import org.wilsonks.backend.domain.enums.Role;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(name="user_id")
    private UUID userId;

    @Column(name="full_name",nullable=false)
    private String fullName;

    @Column(nullable=false,unique=true)
    private String email;

    @Column(nullable=false,unique=true)
    private String phone;

    @Column(nullable=false)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name="employment_situation",nullable=false)
    private EmploymentSituation employmentSituation;

    @Column(name="password_hash",nullable=false)
    private String passwordHash;

    @Column(name="email_verified",nullable=false)
    private boolean emailVerified;

    @Column(name="phone_verified",nullable=false)
    private boolean phoneVerified;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Role role=Role.CANDIDATE;

    @Column(name="created_at",nullable=false)
    private OffsetDateTime createdAt;

    @Column(name="updated_at",nullable=false)
    private OffsetDateTime updatedAt;

    @OneToOne(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Candidate candidate;

    @PrePersist
    void create() {
        if (userId == null) userId = UUID.randomUUID();
        createdAt = updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    void update() {
        updatedAt = OffsetDateTime.now();
    }

}
