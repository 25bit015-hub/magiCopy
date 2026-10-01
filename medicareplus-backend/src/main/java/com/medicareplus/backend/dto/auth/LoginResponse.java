package com.medicareplus.backend.dto.auth;

public record LoginResponse(
        String token,
        UserResponse user
) {}
