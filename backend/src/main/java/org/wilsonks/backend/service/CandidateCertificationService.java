package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateCertification;
import org.wilsonks.backend.dto.requests.CandidateCertificationRequest;
import org.wilsonks.backend.repository.CandidateCertificationsRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateCertificationService {

    private final CandidateService candidateService;
    private final CandidateCertificationsRepository certificationRepository;

    @Transactional(readOnly = true)
    public List<CandidateCertification> getMyCertifications(UUID userId) {
        return certificationRepository.findAllByCandidateUserIdOrderByDisplayOrderAsc(userId);
    }

    public CandidateCertification create(UUID userId, CandidateCertificationRequest request) {

        Candidate candidate = candidateService.getCandidateByUserId(userId);

        CandidateCertification certification = new CandidateCertification();

        certification.setCandidate(candidate);

        certification.setName(request.name().trim());

        certification.setIssuingOrganization(request.issuingOrganization() != null ? request.issuingOrganization().trim() : null);

        certification.setIssueDate(request.issueDate());

        certification.setExpiryDate(request.expiryDate());

        certification.setDescription(request.description() != null ? request.description().trim() : null);

        int nextOrder = certificationRepository.findAllByCandidateUserIdOrderByDisplayOrderAsc(userId).size();

        certification.setDisplayOrder(nextOrder);

        return certificationRepository.save(certification);
    }

    public CandidateCertification update(UUID userId, UUID certificationId, CandidateCertificationRequest request) {

        CandidateCertification certification = certificationRepository.findById(certificationId).orElseThrow(() -> new IllegalArgumentException("Certification record not found."));

        validateOwnership(certification, userId);

        certification.setName(request.name().trim());

        certification.setIssuingOrganization(request.issuingOrganization() != null ? request.issuingOrganization().trim() : null);

        certification.setIssueDate(request.issueDate());

        certification.setExpiryDate(request.expiryDate());

        certification.setDescription(request.description() != null ? request.description().trim() : null);

        return certificationRepository.save(certification);
    }

    public void delete(UUID userId, UUID certificationId) {

        CandidateCertification certification = certificationRepository.findById(certificationId).orElseThrow(() -> new IllegalArgumentException("Certification record not found."));

        validateOwnership(certification, userId);

        certificationRepository.delete(certification);
    }

    private void validateOwnership(CandidateCertification certification, UUID userId) {

        if (!certification.getCandidate().getUser().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Certification record does not belong to this candidate.");
        }
    }
}