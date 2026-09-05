package org.wilsonks.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.CandidateSkill;
import org.wilsonks.backend.domain.SkillTag;
import org.wilsonks.backend.dto.requests.CandidateTagSelectionRequest;
import org.wilsonks.backend.dto.responses.CandidateSkillResponse;
import org.wilsonks.backend.repository.CandidateSkillRepository;
import org.wilsonks.backend.repository.SkillTagRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateSkillService {

    private final CandidateService candidateService;
    private final CandidateSkillRepository candidateSkillRepository;
    private final SkillTagRepository skillTagRepository;

    @Transactional(readOnly = true)
    public List<CandidateSkillResponse> getMySkills(
            UUID userId) {

        return candidateSkillRepository
                .findAllByCandidateUserId(userId)
                .stream()
                .map(CandidateSkillResponse::of)
                .toList();
    }

    public List<CandidateSkillResponse> replaceSkills(
            UUID userId,
            CandidateTagSelectionRequest request) {

        Candidate candidate =
                candidateService.getCandidateByUserId(userId);

        List<UUID> tagIds = request.tagIds();

        validateNoDuplicates(tagIds);

        List<SkillTag> tags =
                skillTagRepository.findAllById(tagIds);

        validateAllTagsExist(tagIds, tags);

        validateAllTagsActive(tags);

        candidateSkillRepository
                .deleteAllByCandidateUserId(userId);

        List<CandidateSkill> selections =
                tags.stream()
                        .map(tag -> createSelection(candidate, tag))
                        .toList();

        return candidateSkillRepository
                .saveAll(selections)
                .stream()
                .map(CandidateSkillResponse::of)
                .toList();
    }

    private CandidateSkill createSelection(
            Candidate candidate,
            SkillTag tag) {

        CandidateSkill selection =
                new CandidateSkill();

        selection.setCandidate(candidate);
        selection.setSkillTag(tag);

        return selection;
    }

    private void validateNoDuplicates(
            List<UUID> tagIds) {

        if (new HashSet<>(tagIds).size() != tagIds.size()) {
            throw new IllegalArgumentException(
                    "Duplicate skill tags are not allowed.");
        }
    }

    private void validateAllTagsExist(
            List<UUID> requestedIds,
            List<SkillTag> foundTags) {

        Set<UUID> foundIds =
                foundTags.stream()
                        .map(SkillTag::getId)
                        .collect(java.util.stream.Collectors.toSet());

        if (!foundIds.containsAll(requestedIds)) {
            throw new IllegalArgumentException(
                    "One or more skill tags do not exist.");
        }
    }

    private void validateAllTagsActive(
            List<SkillTag> tags) {

        boolean inactiveTag =
                tags.stream()
                        .anyMatch(tag -> !tag.isActive());

        if (inactiveTag) {
            throw new IllegalArgumentException(
                    "Inactive skill tags cannot be selected.");
        }
    }
}