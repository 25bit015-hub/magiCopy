package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
}
