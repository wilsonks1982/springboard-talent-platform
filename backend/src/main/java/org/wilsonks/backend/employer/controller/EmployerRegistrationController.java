package org.wilsonks.backend.employer.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wilsonks.backend.employer.dto.EmployerRegistrationRequest;
import org.wilsonks.backend.employer.dto.EmployerRegistrationResponse;
import org.wilsonks.backend.employer.service.EmployerRegistrationService;

@RestController
@RequestMapping("/api/v1/employers")
@AllArgsConstructor
@Slf4j
public class EmployerRegistrationController {

    private final EmployerRegistrationService employerRegistrationService;

    @PostMapping("/register")
    public ResponseEntity<EmployerRegistrationResponse> register(@Valid @RequestBody EmployerRegistrationRequest request) {
        log.info("Registering employer with request: {}", request);
        EmployerRegistrationResponse response = employerRegistrationService.register(request);

        log.info("Employer registered successfully: {}", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}