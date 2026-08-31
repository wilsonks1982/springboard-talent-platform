package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateReference;
import org.wilsonks.backend.dto.requests.CandidateReferenceRequest;
import org.wilsonks.backend.repository.CandidateReferencesRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateReferenceService {

    private final CandidateService candidateService;
    private final CandidateReferencesRepository referenceRepository;

    @Transactional(readOnly = true)
    public List<CandidateReference> getMyReferences(UUID userId) {
        return referenceRepository.findByCandidateUserIdOrderByDisplayOrderAsc(userId);
    }

    public CandidateReference create(UUID userId, CandidateReferenceRequest request) {

        Candidate candidate = candidateService.getCandidateByUserId(userId);

        CandidateReference reference = new CandidateReference();

        reference.setCandidate(candidate);

        reference.setName(request.name().trim());

        reference.setRelationship(request.relationship() != null ? request.relationship().trim() : null);

        reference.setContact(request.contact() != null ? request.contact().trim() : null);

        int nextOrder = referenceRepository.findByCandidateUserIdOrderByDisplayOrderAsc(userId).size();

        reference.setDisplayOrder(nextOrder);

        return referenceRepository.save(reference);
    }

    public CandidateReference update(UUID userId, UUID referenceId, CandidateReferenceRequest request) {

        CandidateReference reference = referenceRepository.findById(referenceId).orElseThrow(() -> new IllegalArgumentException("Reference record not found."));

        validateOwnership(reference, userId);

        reference.setName(request.name().trim());

        reference.setRelationship(request.relationship() != null ? request.relationship().trim() : null);

        reference.setContact(request.contact() != null ? request.contact().trim() : null);

        return referenceRepository.save(reference);
    }

    public void delete(UUID userId, UUID referenceId) {

        CandidateReference reference = referenceRepository.findById(referenceId).orElseThrow(() -> new IllegalArgumentException("Reference record not found."));

        validateOwnership(reference, userId);

        referenceRepository.delete(reference);
    }

    private void validateOwnership(CandidateReference reference, UUID userId) {

        if (!reference.getCandidate().getUser().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Reference record does not belong to this candidate.");
        }
    }
}
