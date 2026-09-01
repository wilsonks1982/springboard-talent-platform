package org.wilsonks.backend.dto.responses;

import lombok.extern.slf4j.Slf4j;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.OpenToRemote;
import org.wilsonks.backend.domain.enums.WorkAuthorization;

import java.util.List;

@Slf4j
public record CandidateCareerPreferencesResponse(
        String desiredTitle,
        List<String> desiredIndustries,
        List<String> desiredLocations,
        OpenToRemote openToRemote,
        Integer noticePeriod,
        WorkAuthorization workAuthorization,
        List<String> languages
) {

    public static CandidateCareerPreferencesResponse of(
            Candidate candidate
    ) {

        return new CandidateCareerPreferencesResponse(
                candidate.getDesiredTitle(),

                candidate.getDesiredIndustries() == null
                        ? List.of()
                        : List.copyOf(candidate.getDesiredIndustries()),

                candidate.getDesiredLocations() == null
                        ? List.of()
                        : List.copyOf(candidate.getDesiredLocations()),

                candidate.getOpenToRemote(),

                candidate.getNoticePeriod(),

                candidate.getWorkAuthorization(),

                candidate.getLanguages() == null
                        ? List.of()
                        : List.copyOf(candidate.getLanguages())
        );
    }
}