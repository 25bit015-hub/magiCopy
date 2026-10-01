package com.medicareplus.backend.dto.medicine;

import com.medicareplus.backend.entity.Medicine;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MedicineResponse(
        Long id,
        String medicineCode,
        String name,
        String category,
        String batchNumber,
        Integer stockQuantity,
        BigDecimal unitPrice,
        LocalDate expiryDate,
        String status
) {
    public static MedicineResponse from(Medicine m) {
        return new MedicineResponse(m.getId(), m.getMedicineCode(), m.getName(), m.getCategory(),
                m.getBatchNumber(), m.getStockQuantity(), m.getUnitPrice(), m.getExpiryDate(),
                m.getStatus().name());
    }
}
