package com.medicareplus.backend.entity;

import com.medicareplus.backend.enums.Gender;
import com.medicareplus.backend.enums.PatientStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String patientCode;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender;

    private Integer age;

    @Column(length = 30)
    private String phone;

    @Column(length = 150)
    private String email;

    @Column(length = 255)
    private String address;

    @Column(length = 5)
    private String bloodGroup;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private PatientStatus status = PatientStatus.ACTIVE;

    private LocalDate lastVisit;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
