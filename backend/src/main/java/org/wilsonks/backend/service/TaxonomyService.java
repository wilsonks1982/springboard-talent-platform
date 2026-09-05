package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.dto.responses.IndustryTagResponse;
import org.wilsonks.backend.dto.responses.SkillTagResponse;
import org.wilsonks.backend.repository.IndustryTagRepository;
import org.wilsonks.backend.repository.SkillTagRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaxonomyService {

    private final IndustryTagRepository industryTagRepository;
    private final SkillTagRepository skillTagRepository;

    public List<IndustryTagResponse> getIndustries() {

        return industryTagRepository
                .findAllByActiveTrueOrderByDisplayOrderAscNameAsc()
                .stream()
                .map(IndustryTagResponse::of)
                .toList();
    }

    public List<SkillTagResponse> getSkills() {

        return skillTagRepository
                .findAllByActiveTrueOrderByDisplayOrderAscNameAsc()
                .stream()
                .map(SkillTagResponse::of)
                .toList();
    }
}