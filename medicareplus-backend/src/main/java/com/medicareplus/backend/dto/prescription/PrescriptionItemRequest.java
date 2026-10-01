package com.medicareplus.backend.dto.prescription;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PrescriptionItemRequest(
        @NotNull Long medicineId,
        String dosage,
        String frequency,
        Integer durationDays,
        @Positive Integer quantity
) {}
