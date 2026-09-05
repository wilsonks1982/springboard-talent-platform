package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateExperience;
import org.wilsonks.backend.domain.enums.ManagementType;
import org.wilsonks.backend.dto.requests.CandidateExperienceRequest;
import org.wilsonks.backend.repository.CandidateExperiencesRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateExperienceService {

    private final CandidateService candidateService;
    private final CandidateExperiencesRepository experienceRepository;

    @Transactional(readOnly = true)
    public List<CandidateExperience> getMyExperiences(UUID userId) {
        return experienceRepository.findAllByCandidateUserIdOrderByStartDateDesc(userId);
    }

    public CandidateExperience create(UUID userId, CandidateExperienceRequest request) {

        Candidate candidate = candidateService.getCandidateByUserId(userId);

        validateCurrentRole(userId, null, request);

        CandidateExperience experience = new CandidateExperience();

        experience.setCandidate(candidate);
        applyRequest(experience, request);

        return experienceRepository.save(experience);
    }

    public CandidateExperience update(UUID userId, UUID experienceId, CandidateExperienceRequest request) {

        CandidateExperience experience = experienceRepository.findById(experienceId).orElseThrow(() -> new IllegalArgumentException("Employment experience not found."));

        validateOwnership(experience, userId);

        validateCurrentRole(userId, experienceId, request);

        applyRequest(experience, request);

        return experienceRepository.save(experience);
    }

    public void delete(UUID userId, UUID experienceId) {

        CandidateExperience experience = experienceRepository.findById(experienceId).orElseThrow(() -> new IllegalArgumentException("Employment experience not found."));

        validateOwnership(experience, userId);

        experienceRepository.delete(experience);
    }

    private void applyRequest(CandidateExperience experience, CandidateExperienceRequest request) {

        experience.setCompanyName(request.companyName().trim());
        experience.setJobTitle(request.jobTitle().trim());
        experience.setStartDate(request.startDate());
        experience.setEndDate(request.endDate());

        experience.setDescription(request.description().trim());

        experience.setReportedToTitle(trimToNull(request.reportedToTitle()));

        experience.setManagementType(request.managementType());

        experience.setTeamSize(normalizeTeamSize(request));

        experience.setReasonForLeaving(trimToNull(request.reasonForLeaving()));
    }

    private Integer normalizeTeamSize(CandidateExperienceRequest request) {

        if (request.managementType() == ManagementType.INDIVIDUAL_CONTRIBUTOR) {

            return null;
        }

        return request.teamSize();
    }

    private void validateCurrentRole(UUID userId, UUID experienceId, CandidateExperienceRequest request) {

        boolean currentRole = request.endDate() == null;

        if (!currentRole) {
            return;
        }

        boolean anotherCurrentRole;

        if (experienceId == null) {
            anotherCurrentRole = experienceRepository.existsByCandidateUserIdAndEndDateIsNull(userId);
        } else {
            anotherCurrentRole = experienceRepository.existsByCandidateUserIdAndIdNotAndEndDateIsNull(userId, experienceId);
        }

        if (anotherCurrentRole) {
            throw new IllegalArgumentException("Only one current employment role is allowed.");
        }
    }

    private void validateOwnership(CandidateExperience experience, UUID userId) {

        if (!experience.getCandidate().getUser().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Employment experience does not belong to this candidate.");
        }
    }

    private String trimToNull(String value) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty() ? null : trimmed;
    }
}