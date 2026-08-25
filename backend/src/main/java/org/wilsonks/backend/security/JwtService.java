package org.wilsonks.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.time.*;
import java.util.*;


@Service
public class JwtService {
    private final SecretKey key;
    private final Duration ttl;
    private final String issuer;

    public JwtService(@Value("${app.jwt.secret}")String s,
                      @Value("${app.jwt.access-token-minutes}")long m,
                      @Value("${app.jwt.issuer}")String i){

        key=Keys.hmacShaKeyFor(Decoders.BASE64.decode(s));
        ttl=Duration.ofMinutes(m);
        issuer=i;
    }

    public String generate(UUID id,String role){
        Instant n=Instant.now();
        return Jwts.builder()
                .subject(id.toString())
                .issuer(issuer)
                .claim("role",role)
                .issuedAt(Date.from(n))
                .expiration(Date.from(n.plus(ttl)))
                .signWith(key).compact();
    }

    public Claims parse(String t){
        return Jwts.parser()
                .verifyWith(key)
                .requireIssuer(issuer)
                .build()
                .parseSignedClaims(t)
                .getPayload();
    }

    public long expires(){
        return ttl.toSeconds();
    }
}
