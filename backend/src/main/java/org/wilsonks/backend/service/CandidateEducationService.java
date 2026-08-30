package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateEducation;
import org.wilsonks.backend.dto.requests.CandidateEducationRequest;
import org.wilsonks.backend.repository.CandidatesEducationRepository;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateEducationService {

    private final CandidateService candidateService;
    private final CandidatesEducationRepository educationRepository;

    @Transactional(readOnly = true)
    public List<CandidateEducation> getMyEducation(UUID userId) {
        return educationRepository.findByCandidateUserIdOrderByDisplayOrderAsc(userId);
    }

    public CandidateEducation create(UUID userId, CandidateEducationRequest request) {

        Candidate candidate = candidateService.getCandidateByUserId(userId);

        CandidateEducation education = new CandidateEducation();

        education.setCandidate(candidate);
        education.setDegree(request.degree().trim());
        education.setInstitution(request.institution().trim());
        education.setFieldOfStudy(request.fieldOfStudy() != null ? request.fieldOfStudy().trim() : null);
        education.setYearOfPassing(request.yearOfPassing());
        education.setEducationLevel(request.educationLevel().trim());

        int nextOrder = educationRepository.findByCandidateUserIdOrderByDisplayOrderAsc(userId).size();

        education.setDisplayOrder(nextOrder);

        return educationRepository.save(education);
    }

    public CandidateEducation update(UUID userId, UUID educationId, CandidateEducationRequest request) {

        CandidateEducation education = educationRepository.findById(educationId).orElseThrow(() -> new IllegalArgumentException("Education record not found."));

        validateOwnership(education, userId);

        education.setDegree(request.degree().trim());
        education.setInstitution(request.institution().trim());
        education.setFieldOfStudy(request.fieldOfStudy() != null ? request.fieldOfStudy().trim() : null);
        education.setYearOfPassing(request.yearOfPassing());
        education.setEducationLevel(request.educationLevel().trim());

        return educationRepository.save(education);
    }

    public void delete(UUID userId, UUID educationId) {

        CandidateEducation education = educationRepository.findById(educationId).orElseThrow(() -> new IllegalArgumentException("Education record not found."));

        validateOwnership(education, userId);

        educationRepository.delete(education);
    }

    private void validateOwnership(CandidateEducation education, UUID userId) {

        if (!education.getCandidate().getUser().getUserId().equals(userId)) {

            throw new IllegalArgumentException("Education record does not belong to this candidate.");
        }
    }
}
