package com.medicareplus.backend.dto.doctor;

import com.medicareplus.backend.entity.Doctor;

public record DoctorResponse(
        Long id,
        String doctorCode,
        String fullName,
        String specialization,
        Integer experienceYears,
        String phone,
        String email,
        Double rating,
        String status,
        Integer patientsCount,
        String initial,
        String colorTag
) {
    public static DoctorResponse from(Doctor d) {
        return new DoctorResponse(
                d.getId(), d.getDoctorCode(), d.getFullName(), d.getSpecialization(),
                d.getExperienceYears(), d.getPhone(), d.getEmail(), d.getRating(),
                d.getStatus().name(), d.getPatientsCount(), d.getInitial(), d.getColorTag()
        );
    }
}
