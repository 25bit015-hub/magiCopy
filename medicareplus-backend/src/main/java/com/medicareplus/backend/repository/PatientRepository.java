package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPatientCode(String patientCode);
    long countByStatus(com.medicareplus.backend.enums.PatientStatus status);
}
