package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {
    Optional<LabTest> findByTestCode(String testCode);
}
