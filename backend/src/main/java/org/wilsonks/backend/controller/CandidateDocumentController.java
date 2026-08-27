package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.wilsonks.backend.domain.CandidateDocument;
import org.wilsonks.backend.dto.CandidateDocumentResponse;
import org.wilsonks.backend.service.CandidateDocumentService;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/documents")
@RequiredArgsConstructor
public class CandidateDocumentController {

    private final CandidateDocumentService documentService;

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CandidateDocumentResponse> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) throws IOException {

        UUID userId = (UUID) authentication.getPrincipal();

        CandidateDocument document = documentService.uploadResume(userId, file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(CandidateDocumentResponse.of(document));
    }
}
