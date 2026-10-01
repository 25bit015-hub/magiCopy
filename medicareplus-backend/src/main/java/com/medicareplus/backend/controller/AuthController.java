package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.auth.CreateUserRequest;
import com.medicareplus.backend.dto.auth.LoginRequest;
import com.medicareplus.backend.dto.auth.LoginResponse;
import com.medicareplus.backend.dto.auth.UserResponse;
import com.medicareplus.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody CreateUserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication authentication) {
        return ResponseEntity.ok(authService.me(authentication.getName()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // Stateless JWT: the client discards the token. Endpoint kept for API-shape parity.
        return ResponseEntity.noContent().build();
    }
}
