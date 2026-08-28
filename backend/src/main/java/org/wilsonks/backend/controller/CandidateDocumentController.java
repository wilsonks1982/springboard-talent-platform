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

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.wilsonks.backend.service.DocumentStorageService;

import java.io.IOException;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidates/me/resume")
@RequiredArgsConstructor
public class CandidateDocumentController {

    private final CandidateDocumentService documentService;
    private final DocumentStorageService storageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CandidateDocumentResponse> uploadResume(@RequestParam("file") MultipartFile file, Authentication authentication) throws IOException {

        UUID userId = (UUID) authentication.getPrincipal();

        CandidateDocument document = documentService.uploadResume(userId, file);

        return ResponseEntity.status(HttpStatus.CREATED).body(CandidateDocumentResponse.of(document));
    }

    @GetMapping
    public ResponseEntity<Resource> downloadResume(Authentication authentication) {

        UUID userId = UUID.fromString(authentication.getName());

        CandidateDocument document = documentService.getResume(userId);

        Path path = storageService.load(document.getStorageKey());

        Resource resource = new FileSystemResource(path);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Resume.pdf\"").body(resource);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResume(Authentication authentication) throws IOException {

        UUID userId = UUID.fromString(authentication.getName());

        documentService.deleteResume(userId);
    }
}
