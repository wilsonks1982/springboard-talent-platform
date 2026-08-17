package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.wilsonks.backend.domain.enums.ConsentType;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name="consents")
@Getter
@Setter
public class Consent {
    @Id
    @Column(name="consent_id")
    private UUID consentId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name="document_type")
    private ConsentType documentType;

    @Column(name="document_version")
    private String documentVersion;

    private String jurisdiction;

    @Column(name="accepted_at")
    private Instant acceptedAt;

    @Column(name="ip_address")
    private String ipAddress;

    @PrePersist void create(){
        if(consentId==null)consentId=UUID.randomUUID();
        acceptedAt=Instant.now();
    }

}
