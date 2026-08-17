package org.wilsonks.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.wilsonks.backend.dto.ConsentDocument;
import org.wilsonks.backend.dto.ConsentRequest;
import org.wilsonks.backend.service.ConsentService;

import java.util.*;

@RestController
@RequestMapping("/api/v1/consents")
public class ConsentController {
    private final ConsentService service;

    public ConsentController(ConsentService s){
        service=s;
    }

    @GetMapping("/current")
    public List<ConsentDocument> current(){
        return service.current();
    }

    @PostMapping
    public Map<String,Object> accept(Authentication a, @Valid @RequestBody ConsentRequest r, HttpServletRequest req){
        service.accept((UUID)a.getPrincipal(), r, clientIp(req));

        return Map.of("accepted",true);
    }

    private String clientIp(HttpServletRequest r){
        String f=r.getHeader("X-Forwarded-For");
        return f==null?r.getRemoteAddr():f.split(",")[0].trim();
    }
}

