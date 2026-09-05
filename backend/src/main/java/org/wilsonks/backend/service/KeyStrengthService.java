package org.wilsonks.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.KeyStrength;
import org.wilsonks.backend.dto.requests.KeyStrengthsRequest;
import org.wilsonks.backend.dto.responses.KeyStrengthResponse;
import org.wilsonks.backend.repository.KeyStrengthRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class KeyStrengthService {

    private static final int MIN_STRENGTHS = 3;
    private static final int MAX_STRENGTHS = 5;
    private static final int MAX_LENGTH = 200;

    private final CandidateService candidateService;
    private final KeyStrengthRepository keyStrengthRepository;

    @Transactional(readOnly = true)
    public List<KeyStrengthResponse> getMyStrengths(
            UUID userId) {

        return keyStrengthRepository
                .findAllByCandidateUserIdOrderByDisplayOrderAsc(userId)
                .stream()
                .map(KeyStrengthResponse::of)
                .toList();
    }

    public List<KeyStrengthResponse> replaceStrengths(
            UUID userId,
            KeyStrengthsRequest request) {

        Candidate candidate =
                candidateService.getCandidateByUserId(userId);

        List<String> strengths =
                normalize(request.strengths());

        validate(strengths);

        keyStrengthRepository
                .deleteAllByCandidateUserId(userId);

        List<KeyStrength> entities =
                java.util.stream.IntStream.range(0, strengths.size())
                        .mapToObj(index ->
                                createStrength(
                                        candidate,
                                        strengths.get(index),
                                        index
                                ))
                        .toList();

        return keyStrengthRepository
                .saveAll(entities)
                .stream()
                .map(KeyStrengthResponse::of)
                .toList();
    }

    private List<String> normalize(
            List<String> strengths) {

        return strengths.stream()
                .map(String::trim)
                .filter(value -> !value.isEmpty())
                .toList();
    }

    private void validate(
            List<String> strengths) {

        if (strengths.isEmpty()) {
            return;
        }

        if (strengths.size() < MIN_STRENGTHS ||
                strengths.size() > MAX_STRENGTHS) {

            throw new IllegalArgumentException(
                    "Key strengths must contain between "
                            + MIN_STRENGTHS
                            + " and "
                            + MAX_STRENGTHS
                            + " items."
            );
        }

        boolean tooLong =
                strengths.stream()
                        .anyMatch(
                                strength ->
                                        strength.length() > MAX_LENGTH
                        );

        if (tooLong) {
            throw new IllegalArgumentException(
                    "Each key strength must not exceed "
                            + MAX_LENGTH
                            + " characters."
            );
        }
    }

    private KeyStrength createStrength(
            Candidate candidate,
            String strength,
            int displayOrder) {

        KeyStrength entity =
                new KeyStrength();

        entity.setCandidate(candidate);
        entity.setStrength(strength);
        entity.setDisplayOrder(displayOrder);

        return entity;
    }
}