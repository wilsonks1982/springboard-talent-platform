package org.wilsonks.backend.service;

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
    static class ConsoleEmail implements Email{
        public void send(String to, String code){
            System.out.println("[DEV EMAIL] "+to+" code="+code);
        }
    }

    @Component
    static class ConsoleSms implements Sms{
        public void send(String to, String code){
            System.out.println("[DEV SMS] "+to+" otp="+code);
        }
    }
}

