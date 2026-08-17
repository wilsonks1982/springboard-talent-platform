package org.wilsonks.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

public final class NotificationService {
    private NotificationService(){}

    public interface Email{
        void send(String to,String code);
    }

    public interface Sms{
        void send(String to,String code);
    }

    @Component
    @Slf4j
    static class ConsoleEmail implements Email{
        public void send(String to, String code){
            log.info("[DEV EMAIL] {} otp={}",to,code);
        }
    }

    @Component
    @Slf4j
    static class ConsoleSms implements Sms{
        public void send(String to, String code){
            log.info("[DEV SMS] {} otp={}",to,code);
        }
    }
}

