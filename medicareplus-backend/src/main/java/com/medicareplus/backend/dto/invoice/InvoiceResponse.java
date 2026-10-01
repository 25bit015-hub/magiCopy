package com.medicareplus.backend.dto.invoice;

import com.medicareplus.backend.entity.Invoice;

import java.math.BigDecimal;
import java.time.LocalDate;

public record InvoiceResponse(
        Long id,
        String invoiceCode,
        Long patientId,
        String patientName,
        String serviceDescription,
        BigDecimal amount,
        LocalDate invoiceDate,
        String status,
        String method
) {
    public static InvoiceResponse from(Invoice i) {
        return new InvoiceResponse(i.getId(), i.getInvoiceCode(),
                i.getPatient().getId(), i.getPatient().getFullName(),
                i.getServiceDescription(), i.getAmount(), i.getInvoiceDate(),
                i.getStatus().name(), i.getMethod() != null ? i.getMethod().name() : null);
    }
}
