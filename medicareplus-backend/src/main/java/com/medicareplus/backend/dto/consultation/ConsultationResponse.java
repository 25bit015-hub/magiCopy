package com.medicareplus.backend.dto.consultation;

import com.medicareplus.backend.entity.Consultation;

import java.time.LocalDateTime;

public record ConsultationResponse(
        Long id,
        Long patientId,
        String patientName,
        Long doctorId,
        String doctorName,
        String symptoms,
        String diagnosis,
        String notes,
        LocalDateTime consultationDate
) {
    public static ConsultationResponse from(Consultation c) {
        return new ConsultationResponse(
                c.getId(), c.getPatient().getId(), c.getPatient().getFullName(),
                c.getDoctor().getId(), c.getDoctor().getFullName(),
                c.getSymptoms(), c.getDiagnosis(), c.getNotes(), c.getConsultationDate()
        );
    }
}
