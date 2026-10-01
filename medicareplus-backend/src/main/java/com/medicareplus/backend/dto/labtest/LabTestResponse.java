package com.medicareplus.backend.dto.labtest;

import com.medicareplus.backend.entity.LabTest;

import java.time.LocalDate;

public record LabTestResponse(
        Long id,
        String testCode,
        Long patientId,
        String patientName,
        Long doctorId,
        String doctorName,
        String testName,
        LocalDate requestedDate,
        String status,
        String result
) {
    public static LabTestResponse from(LabTest l) {
        return new LabTestResponse(l.getId(), l.getTestCode(),
                l.getPatient().getId(), l.getPatient().getFullName(),
                l.getDoctor().getId(), l.getDoctor().getFullName(),
                l.getTestName(), l.getRequestedDate(), l.getStatus().name(), l.getResult());
    }
}
