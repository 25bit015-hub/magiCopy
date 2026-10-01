package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    Optional<Prescription> findByPrescriptionCode(String prescriptionCode);
}
