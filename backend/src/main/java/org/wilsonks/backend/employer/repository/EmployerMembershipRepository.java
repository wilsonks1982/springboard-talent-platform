package org.wilsonks.backend.employer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.employer.domain.EmployerMembership;

import java.util.UUID;

public interface EmployerMembershipRepository extends JpaRepository<EmployerMembership, UUID> {
}