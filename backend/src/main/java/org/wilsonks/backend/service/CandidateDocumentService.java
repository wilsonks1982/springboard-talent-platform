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

        // 1. Create document metadata
        CandidateDocument document = new CandidateDocument();

        document.setCandidate(candidate);
        document.setDocumentType(DocumentType.RESUME);
        document.setOriginalFileName(file.getOriginalFilename());
        document.setContentType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setUploadedAt(OffsetDateTime.now());
        document.setParsingStatus(ParsingStatus.NOT_STARTED);
        document.setPrimary(false);

        // 2. Persist so UUID is generated
        document = documentsRepo.saveAndFlush(document);

        // 3. Store physical file
        String storageKey = storageService.store(candidate.getUser().getEmail(), document.getId(), file);

        // 4. Update metadata with storage location
        document.setStorageKey(storageKey);

        return documentsRepo.save(document);
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
