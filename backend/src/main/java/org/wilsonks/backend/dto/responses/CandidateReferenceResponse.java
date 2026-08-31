package org.wilsonks.backend.dto.responses;

import java.util.UUID;

public record CandidateReferenceResponse(
        UUID id,
        String name,
        String relationship,
        String contact,
        int displayOrder
) {
    public static CandidateReferenceResponse of(
            org.wilsonks.backend.domain.CandidateReference reference
    ) {
        return new CandidateReferenceResponse(
                reference.getId(),
                reference.getName(),
                reference.getRelationship(),
                reference.getContact(),
                reference.getDisplayOrder()
        );
    }
}
