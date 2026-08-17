package org.wilsonks.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.User;
import org.wilsonks.backend.domain.VerificationCode;
import org.wilsonks.backend.domain.enums.VerificationChannel;
import org.wilsonks.backend.domain.enums.VerificationPurpose;
import org.wilsonks.backend.repository.CodesRepository;
import org.wilsonks.backend.repository.UsersRepository;

import java.security.SecureRandom;
import java.time.*;
import java.util.*;

@Service
public class VerificationService {
    private final CodesRepository codes;
    private final UsersRepository users;
    private final PasswordEncoder enc;
    private final NotificationService.Email email;
    private final NotificationService.Sms sms;
    private final int minutes,max;
    private final Random random=new SecureRandom();

    public VerificationService(
            CodesRepository c,
            UsersRepository u,
            PasswordEncoder e,
            NotificationService.Email em,
            NotificationService.Sms sm,
            @Value("${app.verification.expiry-minutes}")int m,
            @Value("${app.verification.max-attempts}")int max){
        codes=c;
        users=u;
        enc=e;
        email=em;
        sms=sm;
        minutes=m;
        this.max=max;
    }

    @Transactional
    public void createEmail(User u){
        send(u, VerificationChannel.EMAIL,VerificationPurpose.EMAIL_VERIFICATION,email);
    }

    @Transactional
    public void resendEmail(UUID id){
        createEmail(users.findById(id).orElseThrow());
    }

    @Transactional
    public void sendOtp(UUID id){
        User u=users.findById(id).orElseThrow();
        send(u,VerificationChannel.PHONE,VerificationPurpose.PHONE_VERIFICATION,sms);
    }

    private void send(User u, VerificationChannel ch, VerificationPurpose purpose, Object provider){
        String code="%06d".formatted(random.nextInt(1_000_000));
        VerificationCode v=new VerificationCode();
        v.setUser(u);
        v.setChannel(ch);
        v.setPurpose(purpose);
        v.setCodeHash(enc.encode(code));
        v.setExpiresAt(Instant.now().plus(minutes,java.time.temporal.ChronoUnit.MINUTES));
        codes.save(v);

        if(provider instanceof NotificationService.Email e) e.send(u.getEmail(),code);
        else ((NotificationService.Sms)provider).send(u.getPhone(),code);
    }

    @Transactional
    public void verify(UUID id,VerificationChannel ch,VerificationPurpose p,String raw){
        VerificationCode v=codes.findFirstByUserUserIdAndChannelAndPurposeAndConsumedAtIsNullOrderByCreatedAtDesc(id,ch,p).orElseThrow(()->new IllegalArgumentException("Verification code not found."));

        if(v.expired())throw new IllegalArgumentException("Verification code has expired.");
        if(v.getAttemptCount()>=max)throw new IllegalArgumentException("Too many verification attempts.");
        v.increment();

        if(!enc.matches(raw,v.getCodeHash()))throw new IllegalArgumentException("Invalid verification code.");
        v.consume();
        User u=users.findById(id).orElseThrow();

        if(ch==VerificationChannel.EMAIL)u.setEmailVerified(true);
        else u.setPhoneVerified(true);
    }
}

