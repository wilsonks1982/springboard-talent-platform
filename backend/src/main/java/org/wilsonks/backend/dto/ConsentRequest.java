package org.wilsonks.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.wilsonks.backend.domain.enums.ConsentType;

public record ConsentRequest(
        @NotNull ConsentType documentType,
        @NotBlank String documentVersion,
        @NotBlank String jurisdiction
){}
