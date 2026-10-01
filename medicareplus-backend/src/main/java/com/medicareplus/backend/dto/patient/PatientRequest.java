package com.medicareplus.backend.dto.patient;

import com.medicareplus.backend.enums.Gender;
import com.medicareplus.backend.enums.PatientStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PatientRequest(
        @NotBlank String fullName,
        @NotNull Gender gender,
        @Positive Integer age,
        String phone,
        String email,
        String address,
        String bloodGroup,
        PatientStatus status
) {}
