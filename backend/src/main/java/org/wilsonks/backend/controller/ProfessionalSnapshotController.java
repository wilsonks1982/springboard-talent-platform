package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wilsonks.backend.dto.responses.ProfessionalSnapshotResponse;
import org.wilsonks.backend.service.ProfessionalSnapshotService;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/professional-snapshot")
@RequiredArgsConstructor
public class ProfessionalSnapshotController {

    private final ProfessionalSnapshotService professionalSnapshotService;

    @GetMapping
    public ProfessionalSnapshotResponse getMySnapshot(
            @AuthenticationPrincipal UUID userId) {

        return professionalSnapshotService
                .getMySnapshot(userId);
    }
}