package org.wilsonks.backend.employer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.employer.domain.EmployerEngagement;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementType;

import java.util.List;
import java.util.UUID;

public interface EmployerEngagementRepository extends JpaRepository<EmployerEngagement, UUID> {

    List<EmployerEngagement> findByCompanyCompanyId(UUID companyId);

    boolean existsByCompanyCompanyIdAndEngagementType(UUID companyId, EmployerEngagementType engagementType);
}
