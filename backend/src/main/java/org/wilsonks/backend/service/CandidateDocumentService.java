package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateDocument;
import org.wilsonks.backend.domain.enums.DocumentType;
import org.wilsonks.backend.domain.enums.ParsingStatus;
import org.wilsonks.backend.repository.CandidateDocumentRepository;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CandidateDocumentService {

    private final CandidateDocumentRepository documentsRepo;
    private final CandidatesRepository candidatesRepo;
    private final DocumentStorageService storageService;

    @Transactional
    public CandidateDocument uploadResume(UUID userId, MultipartFile file) throws IOException {

        validate(file);

        Candidate candidate = candidatesRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("Candidate profile not found."));

        CandidateDocument document = documentsRepo.findByCandidateUserIdAndDocumentType(userId, DocumentType.RESUME).orElse(null);

        if (document == null) {

            document = new CandidateDocument();

            document.setCandidate(candidate);
            document.setDocumentType(DocumentType.RESUME);
            document.setParsingStatus(ParsingStatus.NOT_STARTED);
        }

        String storageKey = storageService.store(candidate.getUser().getEmail(), "Resume", file);

        document.setOriginalFileName(file.getOriginalFilename());

        document.setStorageKey(storageKey);

        document.setContentType(file.getContentType());

        document.setFileSize(file.getSize());

        document.setUploadedAt(OffsetDateTime.now());

        document.setParsingStatus(ParsingStatus.NOT_STARTED);

        document.setParsingError(null);

        return documentsRepo.save(document);
    }

    @Transactional(readOnly = true)
    public CandidateDocument getResume(UUID userId) {

        return documentsRepo.findByCandidateUserIdAndDocumentType(userId, DocumentType.RESUME).orElseThrow(() -> new IllegalArgumentException("Resume not found."));
    }

    @Transactional
    public void deleteResume(UUID userId) throws IOException {

        CandidateDocument document = documentsRepo.findByCandidateUserIdAndDocumentType(userId, DocumentType.RESUME).orElseThrow(() -> new IllegalArgumentException("Resume not found."));

        storageService.delete(document.getStorageKey());

        documentsRepo.delete(document);
    }


    @Transactional
    public CandidateDocument uploadDocument(
            UUID userId,
            DocumentType documentType,
            MultipartFile file
    ) throws IOException {

        validate(file, documentType);

        Candidate candidate = candidatesRepo.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Candidate profile not found.")
                );

        CandidateDocument document =
                documentsRepo
                        .findByCandidateUserIdAndDocumentType(
                                userId,
                                documentType
                        )
                        .orElse(null);

        if (document == null) {
            document = new CandidateDocument();
            document.setCandidate(candidate);
            document.setDocumentType(documentType);
            document.setParsingStatus(ParsingStatus.NOT_STARTED);
        }

        String documentName = switch (documentType) {
            case LAST_INCREMENT_LETTER -> "Last-Increment-Letter";
            case RELIEVING_LETTER -> "Relieving-Letter";
            default -> throw new IllegalArgumentException(
                    "Unsupported employment verification document type."
            );
        };

        String oldStorageKey = document.getStorageKey();

        String storageKey = storageService.store(
                candidate.getUser().getEmail(),
                documentName,
                file
        );

        document.setOriginalFileName(file.getOriginalFilename());
        document.setStorageKey(storageKey);
        document.setContentType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setUploadedAt(OffsetDateTime.now());
        document.setParsingStatus(ParsingStatus.NOT_STARTED);
        document.setParsingError(null);

        CandidateDocument saved = documentsRepo.save(document);

        /*
         * Storage currently uses deterministic names, so replacement
         * normally overwrites the same physical file.
         *
         * If an older storage key differs, clean it up.
         */
        if (oldStorageKey != null &&
                !oldStorageKey.equals(storageKey)) {

            storageService.delete(oldStorageKey);
        }

        return saved;
    }

    @Transactional(readOnly = true)
    public CandidateDocument getDocument(
            UUID userId,
            DocumentType documentType
    ) {

        return documentsRepo
                .findByCandidateUserIdAndDocumentType(
                        userId,
                        documentType
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Document not found."
                        )
                );
    }

    @Transactional
    public void deleteDocument(
            UUID userId,
            DocumentType documentType
    ) throws IOException {

        CandidateDocument document =
                documentsRepo
                        .findByCandidateUserIdAndDocumentType(
                                userId,
                                documentType
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Document not found."
                                )
                        );

        storageService.delete(document.getStorageKey());

        documentsRepo.delete(document);
    }

    private void validate(
            MultipartFile file,
            DocumentType documentType
    ) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Document file is required."
            );
        }

        if (documentType != DocumentType.LAST_INCREMENT_LETTER &&
                documentType != DocumentType.RELIEVING_LETTER) {

            throw new IllegalArgumentException(
                    "Unsupported employment verification document type."
            );
        }

        String contentType = file.getContentType();

        if (!"application/pdf".equalsIgnoreCase(contentType)) {
            throw new IllegalArgumentException(
                    "Only PDF documents are currently supported."
            );
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException(
                    "Document must not exceed 5 MB."
            );
        }
    }

    private void validate(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is required.");
        }

        String contentType = file.getContentType();

        if (!"application/pdf".equalsIgnoreCase(contentType)) {
            throw new IllegalArgumentException("Only PDF resumes are currently supported.");
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("Resume file must not exceed 5 MB.");
        }
    }
}
