package com.medicareplus.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "prescription_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @Column(length = 100)
    private String dosage;

    @Column(length = 100)
    private String frequency;

    private Integer durationDays;

    @Builder.Default
    private Integer quantity = 1;
}
