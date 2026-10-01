package com.medicareplus.backend.dto.medicine;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MedicineRequest(
        @NotBlank String name,
        String category,
        String batchNumber,
        @PositiveOrZero Integer stockQuantity,
        @NotNull BigDecimal unitPrice,
        LocalDate expiryDate
) {}
