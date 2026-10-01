package com.medicareplus.backend.dto.auth;

import com.medicareplus.backend.entity.User;

public record UserResponse(
        Long id,
        String name,
        String email,
        String role,
        String status,
        String avatar
) {
    public static UserResponse from(User u) {
        return new UserResponse(u.getId(), u.getFullName(), u.getEmail(),
                u.getRole().name(), u.getStatus().name(), u.getInitials());
    }
}
