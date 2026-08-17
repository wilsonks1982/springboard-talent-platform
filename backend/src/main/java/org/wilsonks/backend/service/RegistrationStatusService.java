package org.wilsonks.backend.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.dto.RegistrationStatusResponse;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationStatusService {
    private final AuthService authService;
    private final ConsentService consentService;

    public RegistrationStatusResponse get(UUID id){
        User user= authService.getUserById(id);
        boolean n= consentService.ndaConsentExists(id);
        boolean p= consentService.privacyConsentExists(id);

        String step=!n?"NDA":!p?"PRIVACY":(!user.isEmailVerified()||!user.isPhoneVerified())?"VERIFICATION":"CONFIRMATION";

        return new RegistrationStatusResponse(id,step,n,p,user.isEmailVerified(),user.isPhoneVerified(),user.getEmploymentSituation());
    }
}

