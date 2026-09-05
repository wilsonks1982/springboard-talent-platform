package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.CandidateExperience;
import org.wilsonks.backend.dto.responses.EmploymentGapResponse;
import org.wilsonks.backend.dto.responses.EmploymentHistoryAnalysisResponse;
import org.wilsonks.backend.repository.CandidateExperiencesRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmploymentHistoryAnalysisService {

    private static final int GAP_THRESHOLD_MONTHS = 3;

    private final CandidateExperiencesRepository experienceRepository;

    public EmploymentHistoryAnalysisResponse analyzeMyEmploymentHistory(UUID userId, LocalDate asOf) {

        List<CandidateExperience> experiences = experienceRepository.findAllByCandidateUserIdOrderByStartDateDesc(userId);

        return analyze(experiences, asOf);
    }

    public EmploymentHistoryAnalysisResponse analyze(List<CandidateExperience> experiences, LocalDate asOf) {

        if (experiences == null || experiences.isEmpty()) {
            return new EmploymentHistoryAnalysisResponse(BigDecimal.ZERO.setScale(1), null, null, List.of());
        }

        LocalDate calculationEnd = asOf.withDayOfMonth(1);

        List<EmploymentPeriod> periods = experiences.stream().map(experience -> toPeriod(experience, calculationEnd)).sorted(Comparator.comparing(EmploymentPeriod::start)).toList();

        List<EmploymentPeriod> mergedPeriods = mergeOverlappingPeriods(periods);

        BigDecimal yearsExperience = calculateYearsExperience(mergedPeriods);

        CandidateExperience currentExperience = experiences.stream().filter(experience -> experience.getEndDate() == null).findFirst().orElse(null);

        List<EmploymentGapResponse> gaps = detectGaps(mergedPeriods);

        return new EmploymentHistoryAnalysisResponse(yearsExperience, currentExperience != null ? currentExperience.getJobTitle() : null, currentExperience != null ? currentExperience.getCompanyName() : null, gaps);
    }

    private EmploymentPeriod toPeriod(CandidateExperience experience, LocalDate calculationEnd) {

        LocalDate start = experience.getStartDate().withDayOfMonth(1);

        LocalDate end = experience.getEndDate() == null ? calculationEnd : experience.getEndDate().withDayOfMonth(1);

        return new EmploymentPeriod(start, end);
    }

    private List<EmploymentPeriod> mergeOverlappingPeriods(List<EmploymentPeriod> periods) {

        if (periods.isEmpty()) {
            return List.of();
        }

        List<EmploymentPeriod> merged = new ArrayList<>();

        EmploymentPeriod current = periods.get(0);

        for (int i = 1; i < periods.size(); i++) {

            EmploymentPeriod next = periods.get(i);

            if (!next.start().isAfter(current.end().plusMonths(1))) {

                LocalDate mergedEnd = current.end().isAfter(next.end()) ? current.end() : next.end();

                current = new EmploymentPeriod(current.start(), mergedEnd);

            } else {
                merged.add(current);
                current = next;
            }
        }

        merged.add(current);

        return merged;
    }

    private BigDecimal calculateYearsExperience(List<EmploymentPeriod> periods) {

        long totalMonths = periods.stream().mapToLong(period -> ChronoUnit.MONTHS.between(period.start(), period.end()) + 1).sum();

        return BigDecimal.valueOf(totalMonths).divide(BigDecimal.valueOf(12), 1, RoundingMode.HALF_UP);
    }

    private List<EmploymentGapResponse> detectGaps(List<EmploymentPeriod> periods) {

        if (periods.size() < 2) {
            return List.of();
        }

        List<EmploymentGapResponse> gaps = new ArrayList<>();

        for (int i = 1; i < periods.size(); i++) {

            EmploymentPeriod previous = periods.get(i - 1);

            EmploymentPeriod next = periods.get(i);

            LocalDate gapStart = previous.end().plusMonths(1);

            LocalDate gapEnd = next.start().minusMonths(1);

            if (gapStart.isAfter(gapEnd)) {
                continue;
            }

            long gapMonths = ChronoUnit.MONTHS.between(gapStart, gapEnd) + 1;

            if (gapMonths > GAP_THRESHOLD_MONTHS) {

                gaps.add(new EmploymentGapResponse(gapStart, gapEnd, gapMonths, true));
            }
        }

        return List.copyOf(gaps);
    }

    private record EmploymentPeriod(LocalDate start, LocalDate end) {
    }
}