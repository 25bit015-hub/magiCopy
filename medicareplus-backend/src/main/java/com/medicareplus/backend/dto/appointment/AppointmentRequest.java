package com.medicareplus.backend.dto.appointment;

import com.medicareplus.backend.enums.AppointmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(
        @NotNull Long patientId,
        @NotNull Long doctorId,
        @NotBlank String serviceType,
        @NotNull LocalDate appointmentDate,
        @NotNull LocalTime appointmentTime,
        AppointmentStatus status,
        String notes
) {}
