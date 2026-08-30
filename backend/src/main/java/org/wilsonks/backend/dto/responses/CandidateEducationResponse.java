package org.wilsonks.backend.dto.responses;

import java.util.UUID;

public record CandidateEducationResponse(
        UUID id,
        String degree,
        String institution,
        String fieldOfStudy,
        Integer yearOfPassing,
        String educationLevel,
        int displayOrder
) {
    public static CandidateEducationResponse of(
            org.wilsonks.backend.domain.CandidateEducation education
    ) {
        return new CandidateEducationResponse(
                education.getId(),
                education.getDegree(),
                education.getInstitution(),
                education.getFieldOfStudy(),
                education.getYearOfPassing(),
                education.getEducationLevel(),
                education.getDisplayOrder()
        );
    }
}