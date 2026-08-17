package org.wilsonks.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Consent;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.domain.enums.ConsentType;
import org.wilsonks.backend.dto.ConsentDocument;
import org.wilsonks.backend.dto.ConsentRequest;
import org.wilsonks.backend.repository.ConsentsRepository;
import org.wilsonks.backend.repository.UsersRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ConsentService {
    private final ConsentsRepository consents;
    private final UsersRepository users;

    private static final String NDA="v1.0";
    private static final String PRIVACY = "v1.0";

    @Transactional
    public void accept(UUID id, ConsentRequest consentRequest, String ip){
        User u=users.findById(id).orElseThrow();
        String current=consentRequest.documentType()== ConsentType.NDA?NDA:PRIVACY;

        if(!current.equals(consentRequest.documentVersion()))throw new IllegalArgumentException("Unsupported consent document version.");
        if(consents.existsByUserUserIdAndDocumentTypeAndDocumentVersion(id,consentRequest.documentType(),consentRequest.documentVersion()))return;

        Consent c=new Consent();

        c.setUser(u);
        c.setDocumentType(consentRequest.documentType());
        c.setDocumentVersion(consentRequest.documentVersion());
        c.setJurisdiction(consentRequest.jurisdiction());
        c.setIpAddress(ip);

        consents.save(c);
    }

    public List<ConsentDocument> current(){
        return List.of(new ConsentDocument(ConsentType.NDA,NDA,"IN",true),
                        new ConsentDocument(ConsentType.PRIVACY_POLICY,PRIVACY,"IN",true)

        );
    }

    public boolean ndaConsentExists(UUID id){
        return consents.existsByUserUserIdAndDocumentType(id,ConsentType.NDA);
    }

    public boolean privacyConsentExists(UUID id){
        return consents.existsByUserUserIdAndDocumentType(id,ConsentType.PRIVACY_POLICY);
    }
}
