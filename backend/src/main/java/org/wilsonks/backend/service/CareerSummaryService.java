package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CareerSummary;
import org.wilsonks.backend.dto.requests.CareerSummaryRequest;
import org.wilsonks.backend.dto.responses.CareerSummaryResponse;
import org.wilsonks.backend.repository.CareerSummaryRepository;

import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CareerSummaryService {

    private static final int MIN_WORDS = 150;
    private static final int MAX_WORDS = 300;

    private final CandidateService candidateService;
    private final CareerSummaryRepository careerSummaryRepository;

    @Transactional(readOnly = true)
    public CareerSummaryResponse getMySummary(
            UUID userId) {

        return careerSummaryRepository
                .findByCandidateUserId(userId)
                .map(CareerSummaryResponse::of)
                .orElse(null);
    }

    public CareerSummaryResponse save(
            UUID userId,
            CareerSummaryRequest request) {

        Candidate candidate =
                candidateService.getCandidateByUserId(userId);

        String summary =
                normalize(request.summary());

        validateWordCount(summary);

        CareerSummary careerSummary =
                careerSummaryRepository
                        .findByCandidateUserId(userId)
                        .orElseGet(() -> {
                            CareerSummary created =
                                    new CareerSummary();

                            created.setCandidate(candidate);

                            return created;
                        });

        careerSummary.setSummary(summary);

        return CareerSummaryResponse.of(
                careerSummaryRepository.save(careerSummary)
        );
    }

    private String normalize(String value) {

        return value
                .trim()
                .replaceAll("\\s+", " ");
    }

    private void validateWordCount(String summary) {

        long wordCount =
                Arrays.stream(summary.split(" "))
                        .filter(word -> !word.isBlank())
                        .count();

        if (wordCount < MIN_WORDS ||
                wordCount > MAX_WORDS) {

            throw new IllegalArgumentException(
                    "Career summary must contain between "
                            + MIN_WORDS
                            + " and "
                            + MAX_WORDS
                            + " words."
            );
        }
    }
}