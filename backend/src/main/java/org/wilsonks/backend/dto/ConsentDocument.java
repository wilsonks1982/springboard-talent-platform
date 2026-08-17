package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.enums.ConsentType;

public record ConsentDocument(
        ConsentType documentType,
        String version,
        String jurisdiction,
        boolean required
){}
