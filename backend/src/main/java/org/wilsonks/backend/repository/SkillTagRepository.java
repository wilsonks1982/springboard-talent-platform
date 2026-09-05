package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.SkillTag;

import java.util.List;
import java.util.UUID;

public interface SkillTagRepository
        extends JpaRepository<SkillTag, UUID> {

    List<SkillTag>
    findAllByActiveTrueOrderByDisplayOrderAscNameAsc();
}