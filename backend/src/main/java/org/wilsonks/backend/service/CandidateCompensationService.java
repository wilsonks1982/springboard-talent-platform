package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.CompensationVisibility;
import org.wilsonks.backend.dto.requests.CandidateCompensationRequest;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateCompensationService {

    private final CandidatesRepository candidatesRepository;
    private final CandidateCompensationBandService bandService;

    @Transactional(readOnly = true)
    public Candidate getCandidate(UUID userId) {
        return candidatesRepository.findByUserUserId(userId);
    }

    public Candidate update(UUID userId, CandidateCompensationRequest request) {

        Candidate candidate = candidatesRepository.findByUserUserId(userId);

        CompensationVisibility visibility = request.compensationVisibility() == null ? CompensationVisibility.HIDDEN : request.compensationVisibility();

        candidate.setCurrentCtc(request.currentCtc());
        candidate.setExpectedCtc(request.expectedCtc());
        candidate.setCompensationVisibility(visibility);

        candidate.setCurrentCtcBand(bandService.calculateBand(request.currentCtc()));

        candidate.setExpectedCtcBand(bandService.calculateBand(request.expectedCtc()));

        return candidatesRepository.save(candidate);
    }
}