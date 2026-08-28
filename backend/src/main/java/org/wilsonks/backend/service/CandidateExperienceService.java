package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateExperience;
import org.wilsonks.backend.dto.requests.CandidateExperienceRequest;
import org.wilsonks.backend.repository.CandidateExperiencesRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CandidateExperienceService {

    private final CandidateExperiencesRepository experiencesRepo;
    private final CandidateService candidateService;

    @Transactional(readOnly = true)
    public List<CandidateExperience> getMyExperiences(UUID userId) {

        return experiencesRepo.findAllByCandidateUserIdOrderByDisplayOrderAsc(userId);
    }

    @Transactional
    public CandidateExperience create(UUID userId, CandidateExperienceRequest request) {

        Candidate candidate = candidateService.getCandidateByUserId(userId);

        validate(request);

        CandidateExperience experience = new CandidateExperience();

        experience.setCandidate(candidate);
        experience.setCompanyName(request.companyName().trim());
        experience.setJobTitle(request.jobTitle().trim());
        experience.setStartDate(request.startDate());
        experience.setEndDate(request.current() ? null : request.endDate());
        experience.setCurrent(request.current());
        experience.setDescription(clean(request.description()));

        experience.setDisplayOrder(nextDisplayOrder(candidate));

        return experiencesRepo.save(experience);
    }

    @Transactional
    public CandidateExperience update(UUID userId, UUID experienceId, CandidateExperienceRequest request) {

        validate(request);

        CandidateExperience experience = experiencesRepo.findById(experienceId).orElseThrow(() -> new IllegalArgumentException("Experience not found."));

        // Ownership check
        if (!experience.getCandidate().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Experience does not belong to this candidate.");
        }

        experience.setCompanyName(request.companyName().trim());

        experience.setJobTitle(request.jobTitle().trim());

        experience.setStartDate(request.startDate());

        experience.setEndDate(request.current() ? null : request.endDate());

        experience.setCurrent(request.current());

        experience.setDescription(clean(request.description()));

        return experiencesRepo.save(experience);
    }

    @Transactional
    public void delete(UUID userId, UUID experienceId) {

        CandidateExperience experience = experiencesRepo.findById(experienceId).orElseThrow(() -> new IllegalArgumentException("Experience not found."));

        // Ownership check
        if (!experience.getCandidate().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Experience does not belong to this candidate.");
        }

        experiencesRepo.delete(experience);
    }

    private int nextDisplayOrder(Candidate candidate) {

        return candidate.getExperiences().stream().mapToInt(CandidateExperience::getDisplayOrder).max().orElse(-1) + 1;
    }

    private void validate(CandidateExperienceRequest request) {

        if (request.companyName() == null || request.companyName().isBlank()) {

            throw new IllegalArgumentException("Company name is required.");
        }

        if (request.jobTitle() == null || request.jobTitle().isBlank()) {

            throw new IllegalArgumentException("Job title is required.");
        }

        if (request.startDate() != null && request.endDate() != null && !request.current() && request.endDate().isBefore(request.startDate())) {

            throw new IllegalArgumentException("End date cannot be before start date.");
        }

        if (request.current() && request.endDate() != null) {

            throw new IllegalArgumentException("Current experience cannot have an end date.");
        }
    }

    private String clean(String value) {

        if (value == null || value.isBlank()) {

            return null;
        }

        return value.trim();
    }
}
