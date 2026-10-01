package com.medicareplus.backend.dto.consultation;

import jakarta.validation.constraints.NotNull;

public record ConsultationRequest(
        @NotNull Long patientId,
        @NotNull Long doctorId,
        Long appointmentId,
        String symptoms,
        String diagnosis,
        String notes
) {}
