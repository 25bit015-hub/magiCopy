package com.medicareplus.backend.entity;

import com.medicareplus.backend.enums.DoctorStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String doctorCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, length = 100)
    private String specialization;

    private Integer experienceYears;

    @Column(length = 30)
    private String phone;

    @Column(length = 150)
    private String email;

    private Double rating;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private DoctorStatus status = DoctorStatus.AVAILABLE;

    @Builder.Default
    private Integer patientsCount = 0;

    @Column(length = 10)
    private String colorTag;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public String getInitial() {
        if (fullName == null) return "?";
        String cleaned = fullName.replace("Dr.", "").trim();
        String[] parts = cleaned.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String p : parts) {
            if (!p.isEmpty()) sb.append(Character.toUpperCase(p.charAt(0)));
            if (sb.length() >= 2) break;
        }
        return sb.toString();
    }
}
