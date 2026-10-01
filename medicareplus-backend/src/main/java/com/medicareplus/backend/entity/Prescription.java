package com.medicareplus.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prescriptions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String prescriptionCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id")
    private Consultation consultation;

    @Column(length = 500)
    private String notes;

    @Column(nullable = false)
    private LocalDateTime prescriptionDate;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<PrescriptionItem> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (this.prescriptionDate == null) this.prescriptionDate = LocalDateTime.now();
    }

    public void addItem(PrescriptionItem item) {
        items.add(item);
        item.setPrescription(this);
    }
}
