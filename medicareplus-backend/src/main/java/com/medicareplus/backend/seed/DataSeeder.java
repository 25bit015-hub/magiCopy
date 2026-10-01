package com.medicareplus.backend.seed;

import com.medicareplus.backend.entity.*;
import com.medicareplus.backend.enums.*;
import com.medicareplus.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Seeds the database with a demo admin account and sample clinical data
 * so the frontend has something to display right after first boot.
 * Controlled by app.seed.enabled (defaults to true) and only runs once,
 * when the users table is empty.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final MedicineRepository medicineRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.enabled:true}")
    private boolean seedEnabled;

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled || userRepository.count() > 0) {
            return;
        }

        User admin = User.builder()
                .fullName("Dr. Amelia Hart")
                .email("amelia.hart@medicareplus.com")
                .password(passwordEncoder.encode("Password123"))
                .role(Role.ADMIN)
                .status(UserStatus.ACTIVE)
                .build();
        userRepository.save(admin);

        Doctor drHart = doctorRepository.save(Doctor.builder()
                .doctorCode("D-201").fullName("Dr. Amelia Hart").specialization("Cardiology")
                .experienceYears(14).phone("+255 700 000 101").email("a.hart@medicareplus.com")
                .rating(4.9).status(DoctorStatus.AVAILABLE).patientsCount(412).colorTag("#3b82f6")
                .build());
        doctorRepository.save(Doctor.builder()
                .doctorCode("D-202").fullName("Dr. Nathan Reyes").specialization("General Medicine")
                .experienceYears(9).phone("+255 700 000 102").email("n.reyes@medicareplus.com")
                .rating(4.8).status(DoctorStatus.AVAILABLE).patientsCount(380).colorTag("#10b981")
                .build());
        doctorRepository.save(Doctor.builder()
                .doctorCode("D-203").fullName("Dr. Priya Shah").specialization("Dentistry")
                .experienceYears(11).phone("+255 700 000 103").email("p.shah@medicareplus.com")
                .rating(4.9).status(DoctorStatus.IN_CONSULTATION).patientsCount(298).colorTag("#f59e0b")
                .build());

        patientRepository.save(Patient.builder()
                .patientCode("P-1001").fullName("Olivia Bennett").gender(Gender.FEMALE).age(32)
                .phone("+255 700 111 001").email("olivia.b@mail.com").address("Kariakoo, Dar es Salaam")
                .bloodGroup("O+").status(PatientStatus.ACTIVE).lastVisit(LocalDate.now().minusDays(3))
                .build());
        patientRepository.save(Patient.builder()
                .patientCode("P-1002").fullName("Marcus Chen").gender(Gender.MALE).age(45)
                .phone("+255 700 111 002").email("marcus.c@mail.com").address("Mikocheni, Dar es Salaam")
                .bloodGroup("A-").status(PatientStatus.ACTIVE).lastVisit(LocalDate.now().minusDays(6))
                .build());
        patientRepository.save(Patient.builder()
                .patientCode("P-1003").fullName("Sophia Almeida").gender(Gender.FEMALE).age(8)
                .phone("+255 700 111 003").email("parent@mail.com").address("Oysterbay, Dar es Salaam")
                .bloodGroup("B+").status(PatientStatus.ACTIVE).lastVisit(LocalDate.now().minusDays(9))
                .build());

        medicineRepository.save(Medicine.builder()
                .medicineCode("M-001").name("Amoxicillin 500mg").category("Antibiotic")
                .batchNumber("BX-2341").stockQuantity(240).unitPrice(new BigDecimal("12.50"))
                .expiryDate(LocalDate.now().plusYears(1)).status(MedicineStatus.IN_STOCK)
                .build());
        medicineRepository.save(Medicine.builder()
                .medicineCode("M-002").name("Paracetamol 500mg").category("Analgesic")
                .batchNumber("BX-2290").stockQuantity(18).unitPrice(new BigDecimal("4.20"))
                .expiryDate(LocalDate.now().plusMonths(9)).status(MedicineStatus.LOW_STOCK)
                .build());

        System.out.println("======================================================");
        System.out.println(" MediCare Plus: demo data imepandwa (seeded).");
        System.out.println(" Ingia na: amelia.hart@medicareplus.com / Password123");
        System.out.println("======================================================");
    }
}
