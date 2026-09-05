package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.DocumentType;
import org.wilsonks.backend.dto.CandidateDocumentResponse;
import org.wilsonks.backend.dto.CandidateResponse;
import org.wilsonks.backend.repository.CandidateDocumentRepository;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidatesRepository candidatesRepo;
    private final CandidateDocumentRepository documentsRepo;

    @Transactional(readOnly = true)
    public CandidateResponse getMyProfile(UUID userId) {
        Candidate candidate = candidatesRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("Candidate profile not found."));

        CandidateDocumentResponse resume =
                documentsRepo.findByCandidateUserIdAndDocumentType(
                                candidate.getUser().getUserId(),
                                DocumentType.RESUME)
                        .map(CandidateDocumentResponse::of)
                        .orElse(null);

        return CandidateResponse.of(candidate, resume);
    }

    @Transactional(readOnly = true)
    public Candidate getCandidateByUserId(UUID userId) {
        return candidatesRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("Candidate profile not found."));
    }
}