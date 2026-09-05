package org.wilsonks.backend.dto.requests;
import jakarta.validation.constraints.NotBlank;

public record CareerSummaryRequest(

        @NotBlank(message = "Career summary is required.")
        String summary

) {
}