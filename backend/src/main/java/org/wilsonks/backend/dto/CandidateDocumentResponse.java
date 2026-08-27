package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.CandidateDocument;

import java.time.OffsetDateTime;
import java.util.UUID;

public record CandidateDocumentResponse(UUID id, String documentType, String originalFileName, String contentType,
                                        Long fileSize, OffsetDateTime uploadedAt, String parsingStatus,
                                        boolean primary) {

    public static CandidateDocumentResponse of(CandidateDocument document) {
        return new CandidateDocumentResponse(
                document.getId(),
                document.getDocumentType().name(),
                document.getOriginalFileName(),
                document.getContentType(),
                document.getFileSize(),
                document.getUploadedAt(),
                document.getParsingStatus().name(),
                document.isPrimary());
    }
}
