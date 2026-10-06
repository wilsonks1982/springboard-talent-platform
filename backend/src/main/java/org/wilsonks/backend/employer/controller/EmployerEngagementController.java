package org.wilsonks.backend.employer.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.employer.dto.EmployerEngagementRequest;
import org.wilsonks.backend.employer.dto.EmployerEngagementResponse;
import org.wilsonks.backend.employer.service.EmployerEngagementService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/employers/me/engagements")
@RequiredArgsConstructor
@Slf4j
public class EmployerEngagementController {

    private final EmployerEngagementService engagementService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployerEngagementResponse create(@AuthenticationPrincipal UUID userId, @Valid @RequestBody EmployerEngagementRequest request) {
        log.info("Creating engagement for userId: {}, request: {}", userId, request);
        EmployerEngagementResponse response= engagementService.create(userId, request);
        log.info("Engagement created successfully: {}", response);
        return response;
    }

    @GetMapping
    public List<EmployerEngagementResponse> getMyEngagements(@AuthenticationPrincipal UUID userId) {
        log.info("Fetching engagements for userId: {}", userId);
        List<EmployerEngagementResponse> responses = engagementService.getMyEngagements(userId);
        log.info("Fetched {} engagements for userId: {}", responses.size(), userId);
        return responses;

    }
}
