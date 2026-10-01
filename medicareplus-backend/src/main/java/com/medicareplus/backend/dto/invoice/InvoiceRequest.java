package com.medicareplus.backend.dto.invoice;

import com.medicareplus.backend.enums.InvoiceStatus;
import com.medicareplus.backend.enums.PaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record InvoiceRequest(
        @NotNull Long patientId,
        @NotBlank String serviceDescription,
        @NotNull BigDecimal amount,
        LocalDate invoiceDate,
        InvoiceStatus status,
        PaymentMethod method
) {}
