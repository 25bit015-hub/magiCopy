package com.medicareplus.backend.entity;

import com.medicareplus.backend.enums.MedicineStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicines")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String medicineCode;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 100)
    private String category;

    @Column(length = 50)
    private String batchNumber;

    @Builder.Default
    private Integer stockQuantity = 0;

    @Column(precision = 10, scale = 2)
    private BigDecimal unitPrice;

    private LocalDate expiryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MedicineStatus status = MedicineStatus.IN_STOCK;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    /** Recomputes status from stock level and expiry date. */
    public void recomputeStatus() {
        if (stockQuantity == null || stockQuantity <= 0) {
            status = MedicineStatus.OUT_OF_STOCK;
            return;
        }
        if (expiryDate != null && expiryDate.isBefore(LocalDate.now().plusDays(60))) {
            status = MedicineStatus.EXPIRING_SOON;
            return;
        }
        if (stockQuantity < 20) {
            status = MedicineStatus.LOW_STOCK;
            return;
        }
        status = MedicineStatus.IN_STOCK;
    }
}
