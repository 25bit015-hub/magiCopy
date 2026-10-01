package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Optional<Medicine> findByMedicineCode(String medicineCode);
}
