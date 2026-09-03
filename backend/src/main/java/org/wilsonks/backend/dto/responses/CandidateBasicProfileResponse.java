package org.wilsonks.backend.dto.responses;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.JobSearchStatus;
import org.wilsonks.backend.domain.enums.NonEmploymentReason;

public record CandidateBasicProfileResponse(
        String fullName,
        String email,
        String phone,
        String city,
        String stateCountry,
        String linkedinUrl,
        Boolean currentlyEmployed,
        NonEmploymentReason nonEmploymentReason,
        JobSearchStatus jobSearchStatus
) {
    public static CandidateBasicProfileResponse of(Candidate candidate) {
        return new CandidateBasicProfileResponse(
                candidate.getFullName(),
                candidate.getUser().getEmail(),
                candidate.getPhone(),
                candidate.getCity(),
                candidate.getStateCountry(),
                candidate.getLinkedinUrl(),
                candidate.getCurrentlyEmployed(),
                candidate.getNonEmploymentReason(),
                candidate.getJobSearchStatus()
        );
    }
}