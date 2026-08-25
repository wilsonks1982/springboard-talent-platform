package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.dto.OnboardingResponse;
import org.wilsonks.backend.repository.CandidatesRepository;
import org.wilsonks.backend.repository.UsersRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OnboardingService {

    private final UsersRepository usersRepo;
    private final CandidatesRepository candidatesRepo;

    @Transactional(readOnly = true)
    public OnboardingResponse getOnboarding(UUID userId) {

        User user = usersRepo.findById(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found."));

        Candidate candidate = candidatesRepo.findById(userId)
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Candidate profile not found."
                        ));

        return new OnboardingResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getEmploymentSituation(),

                candidate.getCurrentCompany(),
                candidate.getCurrentRole(),
                candidate.getYearsExperience(),

                candidate.getCurrentChallenge(),
                candidate.getGrowthAspiration(),
                candidate.getPlainLanguagePitch(),

                candidate.getFunctionalArea(),

                candidate.getWorkModePreference(),
                candidate.getRelocationPreference(),

                candidate.getNoticePeriod(),

                candidate.getCompensationRange(),
                candidate.isCompensationVisibleToRecruiters(),

                candidate.getLinkedinUrl(),

                candidate.getOnboardingCompletedAt()
        );
    }
}