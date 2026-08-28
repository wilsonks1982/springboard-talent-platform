package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.CandidateResponse;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidatesRepository candidatesRepo;

    @Transactional(readOnly = true)
    public CandidateResponse getMyProfile(UUID userId) {

        Candidate candidate = candidatesRepo.findById(userId).orElseThrow(() -> new IllegalArgumentException("Candidate profile not found."));

        return CandidateResponse.of(candidate);
    }
}