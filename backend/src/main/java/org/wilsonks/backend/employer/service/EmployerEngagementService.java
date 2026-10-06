package org.wilsonks.backend.employer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.employer.domain.EmployerCompany;
import org.wilsonks.backend.employer.domain.EmployerEngagement;
import org.wilsonks.backend.employer.domain.EmployerMembership;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementStatus;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementType;
import org.wilsonks.backend.employer.domain.enums.EmployerMembershipRole;
import org.wilsonks.backend.employer.dto.EmployerEngagementRequest;
import org.wilsonks.backend.employer.dto.EmployerEngagementResponse;
import org.wilsonks.backend.employer.repository.EmployerEngagementRepository;
import org.wilsonks.backend.employer.repository.EmployerMembershipRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployerEngagementService {

    private final EmployerEngagementRepository engagementRepository;
    private final EmployerMembershipRepository membershipRepository;

    @Transactional
    public EmployerEngagementResponse create(UUID userId, EmployerEngagementRequest request) {
        EmployerMembership membership = getActiveCompanyAdminMembership(userId);

        EmployerCompany company = membership.getCompany();
        UUID companyId = company.getCompanyId();

        EmployerEngagementType type = request.engagementType();

        if (engagementRepository.existsByCompanyCompanyIdAndEngagementType(companyId, type)) {

            throw new IllegalArgumentException("This engagement type already exists for the company.");
        }

        EmployerEngagement engagement = new EmployerEngagement();

        engagement.setCompany(company);
        engagement.setEngagementType(type);
        engagement.setContext(normalize(request.context()));

        /*
         * Commercial agreement is not accepted during the initial
         * engagement selection in this phase.
         */
        engagement.setFeeTierAgreementAccepted(false);
        engagement.setFeeTierAgreementAcceptedAt(null);

        /*
         * System-tracked field. It becomes meaningful for
         * Hiring & Talent Search after the hiring workflow exists.
         */
        engagement.setFirstPlacementUsed(false);

        /*
         * Every newly created engagement enters verification.
         * An invitation does not bypass this state.
         */
        engagement.setEngagementStatus(EmployerEngagementStatus.PENDING_VERIFICATION);

        EmployerEngagement saved = engagementRepository.save(engagement);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<EmployerEngagementResponse> getMyEngagements(UUID userId) {
        EmployerMembership membership = getActiveMembership(userId);

        UUID companyId = membership.getCompany().getCompanyId();

        return engagementRepository.findByCompanyCompanyId(companyId).stream().map(this::toResponse).toList();
    }

    private EmployerMembership getActiveCompanyAdminMembership(UUID userId) {
        EmployerMembership membership = getActiveMembership(userId);

        if (membership.getRole() != EmployerMembershipRole.COMPANY_ADMIN) {
            throw new IllegalStateException("Only the company administrator can configure engagements.");
        }

        return membership;
    }

    private EmployerMembership getActiveMembership(UUID userId) {
        EmployerMembership membership = membershipRepository.findByUserUserId(userId).orElseThrow(() -> new IllegalArgumentException("Employer membership not found."));

        if (!membership.isActive()) {
            throw new IllegalStateException("Employer membership is inactive.");
        }

        if (membership.getCompany() == null) {
            throw new IllegalStateException("Employer company is not associated with this membership.");
        }

        return membership;
    }

    private EmployerEngagementResponse toResponse(EmployerEngagement engagement) {
        return new EmployerEngagementResponse(
                engagement.getEngagementId(),
                engagement.getCompany().getCompanyId(),
                engagement.getEngagementType(),
                engagement.getContext(),
                engagement.isFeeTierAgreementAccepted(),
                engagement.isFirstPlacementUsed(),
                engagement.getEngagementStatus()
        );
    }

    private String normalize(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}
