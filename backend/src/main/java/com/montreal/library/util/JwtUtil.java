package com.montreal.library.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {
    private final Key key;
    private final long expirationMs;

    public JwtUtil(@Value("${jwt.secret:mysecretkey}") String secret,
                   @Value("${jwt.expiration-ms:3600000}") long expirationMs){
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationMs = expirationMs;
    }

    public String generateToken(String username, List<String> roles){
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expirationMs))
                .signWith(key)
                .compact();
    }

    public Jws<Claims> validate(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
    public String getUsername(String token){ return validate(token).getBody().getSubject(); }
}
