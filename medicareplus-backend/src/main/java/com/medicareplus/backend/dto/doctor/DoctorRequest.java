package com.medicareplus.backend.dto.doctor;

import com.medicareplus.backend.enums.DoctorStatus;
import jakarta.validation.constraints.NotBlank;

public record DoctorRequest(
        @NotBlank String fullName,
        @NotBlank String specialization,
        Integer experienceYears,
        String phone,
        String email,
        Double rating,
        DoctorStatus status,
        String colorTag,
        Long userId
) {}
