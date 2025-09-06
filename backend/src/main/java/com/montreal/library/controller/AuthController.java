package com.montreal.library.controller;

import com.montreal.library.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // reader:reader -> ROLE_READ
    // writer:writer -> ROLE_WRITE
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String u = body.get("username");
        String p = body.get("password");
        if ("reader".equals(u) && "reader".equals(p)) {
            String token = jwtUtil.generateToken(u, List.of("ROLE_READ"));
            return ResponseEntity.ok(Map.of("token", token));
        }
        if ("writer".equals(u) && "writer".equals(p)) {
            String token = jwtUtil.generateToken(u, List.of("ROLE_WRITE"));
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body(Map.of("error", "invalid_credentials"));
    }
}
