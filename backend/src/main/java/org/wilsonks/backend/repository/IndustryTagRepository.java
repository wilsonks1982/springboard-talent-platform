package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.IndustryTag;

import java.util.List;
import java.util.UUID;

public interface IndustryTagRepository
        extends JpaRepository<IndustryTag, UUID> {

    List<IndustryTag>
    findAllByActiveTrueOrderByDisplayOrderAscNameAsc();
}