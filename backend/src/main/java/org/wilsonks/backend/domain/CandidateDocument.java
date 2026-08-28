package org.wilsonks.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.wilsonks.backend.domain.enums.DocumentType;
import org.wilsonks.backend.domain.enums.ParsingStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "candidate_documents")
@Getter
@Setter
@NoArgsConstructor
public class CandidateDocument {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "candidate_user_id", nullable = false, unique = true)
    private Candidate candidate;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false)
    private DocumentType documentType;

    @Column(name = "original_file_name", nullable = false, length = 500)
    private String originalFileName;

    @Column(name = "storage_key", length = 1000)
    private String storageKey;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "uploaded_at", nullable = false)
    private OffsetDateTime uploadedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "parsing_status", nullable = false)
    private ParsingStatus parsingStatus = ParsingStatus.NOT_STARTED;

    @Column(name = "parsing_error", columnDefinition = "TEXT")
    private String parsingError;

}
