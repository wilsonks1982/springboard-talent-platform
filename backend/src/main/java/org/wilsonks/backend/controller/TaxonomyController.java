package org.wilsonks.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.wilsonks.backend.dto.responses.IndustryTagResponse;
import org.wilsonks.backend.dto.responses.SkillTagResponse;
import org.wilsonks.backend.service.TaxonomyService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/taxonomy")
@RequiredArgsConstructor
public class TaxonomyController {

    private final TaxonomyService taxonomyService;

    @GetMapping("/industries")
    public List<IndustryTagResponse> getIndustries() {

        return taxonomyService.getIndustries();
    }

    @GetMapping("/skills")
    public List<SkillTagResponse> getSkills() {

        return taxonomyService.getSkills();
    }
}