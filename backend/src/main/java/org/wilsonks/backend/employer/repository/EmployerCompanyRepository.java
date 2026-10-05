package org.wilsonks.backend.employer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.employer.domain.EmployerCompany;

import java.util.UUID;

public interface EmployerCompanyRepository extends JpaRepository<EmployerCompany, UUID> {
}
