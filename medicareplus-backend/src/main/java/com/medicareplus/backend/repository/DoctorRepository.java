package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByDoctorCode(String doctorCode);
}
