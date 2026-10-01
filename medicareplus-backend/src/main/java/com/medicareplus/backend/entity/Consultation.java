package com.medicareplus.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "consultations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @Column(length = 1000)
    private String symptoms;

    @Column(length = 1000)
    private String diagnosis;

    @Column(length = 1000)
    private String notes;

    @Column(nullable = false)
    private LocalDateTime consultationDate;

    @PrePersist
    protected void onCreate() {
        if (this.consultationDate == null) this.consultationDate = LocalDateTime.now();
    }
}
