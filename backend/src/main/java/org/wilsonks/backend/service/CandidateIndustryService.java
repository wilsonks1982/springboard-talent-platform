package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateIndustry;
import org.wilsonks.backend.domain.IndustryTag;
import org.wilsonks.backend.dto.requests.CandidateTagSelectionRequest;
import org.wilsonks.backend.dto.responses.CandidateIndustryResponse;
import org.wilsonks.backend.repository.CandidateIndustryRepository;
import org.wilsonks.backend.repository.IndustryTagRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateIndustryService {

    private final CandidateService candidateService;
    private final CandidateIndustryRepository candidateIndustryRepository;
    private final IndustryTagRepository industryTagRepository;

    @Transactional(readOnly = true)
    public List<CandidateIndustryResponse> getMyIndustries(
            UUID userId) {

        return candidateIndustryRepository
                .findAllByCandidateUserId(userId)
                .stream()
                .map(CandidateIndustryResponse::of)
                .toList();
    }

    public List<CandidateIndustryResponse> replaceIndustries(
            UUID userId,
            CandidateTagSelectionRequest request) {

        Candidate candidate =
                candidateService.getCandidateByUserId(userId);

        List<UUID> tagIds = request.tagIds();

        validateNoDuplicates(tagIds);

        List<IndustryTag> tags =
                industryTagRepository.findAllById(tagIds);

        validateAllTagsExist(tagIds, tags);

        validateAllTagsActive(tags);

        candidateIndustryRepository
                .deleteAllByCandidateUserId(userId);

        List<CandidateIndustry> selections =
                tags.stream()
                        .map(tag -> createSelection(candidate, tag))
                        .toList();

        return candidateIndustryRepository
                .saveAll(selections)
                .stream()
                .map(CandidateIndustryResponse::of)
                .toList();
    }

    private CandidateIndustry createSelection(
            Candidate candidate,
            IndustryTag tag) {

        CandidateIndustry selection =
                new CandidateIndustry();

        selection.setCandidate(candidate);
        selection.setIndustryTag(tag);

        return selection;
    }

    private void validateNoDuplicates(
            List<UUID> tagIds) {

        if (new HashSet<>(tagIds).size() != tagIds.size()) {
            throw new IllegalArgumentException(
                    "Duplicate industry tags are not allowed.");
        }
    }

    private void validateAllTagsExist(
            List<UUID> requestedIds,
            List<IndustryTag> foundTags) {

        Set<UUID> foundIds =
                foundTags.stream()
                        .map(IndustryTag::getId)
                        .collect(java.util.stream.Collectors.toSet());

        if (!foundIds.containsAll(requestedIds)) {
            throw new IllegalArgumentException(
                    "One or more industry tags do not exist.");
        }
    }

    private void validateAllTagsActive(
            List<IndustryTag> tags) {

        boolean inactiveTag =
                tags.stream()
                        .anyMatch(tag -> !tag.isActive());

        if (inactiveTag) {
            throw new IllegalArgumentException(
                    "Inactive industry tags cannot be selected.");
        }
    }
}