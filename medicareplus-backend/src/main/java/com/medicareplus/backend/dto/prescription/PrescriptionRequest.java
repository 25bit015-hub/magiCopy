package com.medicareplus.backend.dto.prescription;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PrescriptionRequest(
        @NotNull Long patientId,
        @NotNull Long doctorId,
        Long consultationId,
        String notes,
        @NotEmpty @Valid List<PrescriptionItemRequest> items
) {}
