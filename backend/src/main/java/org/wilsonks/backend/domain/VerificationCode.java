package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.domain.enums.VerificationChannel;
import org.wilsonks.backend.domain.enums.VerificationPurpose;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name="verification_codes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerificationCode {
    @Id
    @Column(name="code_id")
    private UUID codeId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private VerificationChannel channel;

    @Enumerated(EnumType.STRING)
    private VerificationPurpose purpose;

    @Column(name="code_hash")
    private String codeHash;

    @Column(name="expires_at")
    private Instant expiresAt;

    @Column(name="attempt_count")
    private int attemptCount;

    @Column(name="created_at")
    private Instant createdAt;

    @Column(name="consumed_at")
    private Instant consumedAt;

    @PrePersist void create(){
        if(codeId==null)codeId=UUID.randomUUID();
        createdAt=Instant.now();
    }

    public void increment(){attemptCount++;}
    public boolean expired(){return Instant.now().isAfter(expiresAt);}
    public boolean consumed(){return consumedAt!=null;}
    public void consume(){consumedAt=Instant.now();}

}

