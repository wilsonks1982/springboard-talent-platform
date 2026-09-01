package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.requests.CandidateCareerPreferencesRequest;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CandidateCareerPreferencesService {

    private final CandidatesRepository candidatesRepository;

    @Transactional(readOnly = true)
    public Candidate getCandidate(UUID userId) {

        Candidate candidate =
                candidatesRepository.findByUserUserId(userId);

        if (candidate == null) {
            throw new IllegalArgumentException(
                    "Candidate profile not found for user."
            );
        }

        return candidate;
    }
    public Candidate update(UUID userId, CandidateCareerPreferencesRequest request) {

        if (request.noticePeriod() < 0) {
            throw new IllegalArgumentException("Notice period cannot be negative.");
        }

        Candidate candidate = candidatesRepository.findByUserUserId(userId);

        if (candidate == null) {
            throw new IllegalArgumentException(
                    "Candidate profile not found for user."
            );
        }

        candidate.setDesiredTitle(request.desiredTitle().trim());

        candidate.setDesiredIndustries(clean(request.desiredIndustries()));

        candidate.setDesiredLocations(clean(request.desiredLocations()));

        candidate.setOpenToRemote(request.openToRemote());

        candidate.setNoticePeriod(request.noticePeriod());

        candidate.setWorkAuthorization(request.workAuthorization());

        candidate.setLanguages(clean(request.languages()));

        Candidate updatedCandidate = candidatesRepository.save(candidate);
        candidatesRepository.flush();


        return updatedCandidate;


    }

    private List<String> clean(List<String> values) {

        if (values == null) {
            return new ArrayList<>();
        }

        List<String> cleaned = new ArrayList<>();

        for (String value : values) {
            if (value == null) {
                continue;
            }

            String trimmed = value.trim();

            if (!trimmed.isBlank() && !cleaned.contains(trimmed)) {
                cleaned.add(trimmed);
            }
        }

        return cleaned;
    }
}