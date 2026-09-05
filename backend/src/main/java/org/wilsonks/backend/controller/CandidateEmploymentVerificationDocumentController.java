package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.wilsonks.backend.domain.CandidateDocument;
import org.wilsonks.backend.domain.enums.DocumentType;
import org.wilsonks.backend.dto.CandidateDocumentResponse;
import org.wilsonks.backend.service.CandidateDocumentService;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.wilsonks.backend.service.DocumentStorageService;

import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/employment-verification/documents")
@RequiredArgsConstructor
public class CandidateEmploymentVerificationDocumentController {

    private final CandidateDocumentService documentService;
    private final DocumentStorageService storageService;

    @PostMapping(value = "/{documentType}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CandidateDocumentResponse> upload(@PathVariable DocumentType documentType, @RequestParam("file") MultipartFile file, Authentication authentication) throws IOException {

        UUID userId = (UUID) authentication.getPrincipal();

        CandidateDocument document = documentService.uploadDocument(userId, documentType, file);

        return ResponseEntity.status(HttpStatus.CREATED).body(CandidateDocumentResponse.of(document));
    }

    @GetMapping("/{documentType}")
    public ResponseEntity<Resource> download(@PathVariable DocumentType documentType, Authentication authentication) {

        UUID userId = UUID.fromString(authentication.getName());

        CandidateDocument document = documentService.getDocument(userId, documentType);

        Path path = storageService.load(document.getStorageKey());

        Resource resource = new FileSystemResource(path);

        String downloadName = switch (documentType) {
            case LAST_INCREMENT_LETTER -> "Last-Increment-Letter.pdf";

            case RELIEVING_LETTER -> "Relieving-Letter.pdf";

            default -> document.getOriginalFileName();
        };

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(document.getContentType())).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + downloadName + "\"").body(resource);
    }

    @DeleteMapping("/{documentType}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable DocumentType documentType, Authentication authentication) throws IOException {

        UUID userId = UUID.fromString(authentication.getName());

        documentService.deleteDocument(userId, documentType);
    }
}