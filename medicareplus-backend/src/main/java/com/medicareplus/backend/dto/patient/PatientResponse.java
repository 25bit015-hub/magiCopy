package com.medicareplus.backend.dto.patient;

import com.medicareplus.backend.entity.Patient;

import java.time.LocalDate;

public record PatientResponse(
        Long id,
        String patientCode,
        String fullName,
        String gender,
        Integer age,
        String phone,
        String email,
        String address,
        String bloodGroup,
        String status,
        LocalDate lastVisit
) {
    public static PatientResponse from(Patient p) {
        return new PatientResponse(
                p.getId(), p.getPatientCode(), p.getFullName(),
                p.getGender() != null ? p.getGender().name() : null,
                p.getAge(), p.getPhone(), p.getEmail(), p.getAddress(),
                p.getBloodGroup(), p.getStatus().name(), p.getLastVisit()
        );
    }
}
