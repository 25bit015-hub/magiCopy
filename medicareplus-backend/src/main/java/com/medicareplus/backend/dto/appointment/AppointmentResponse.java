package com.medicareplus.backend.dto.appointment;

import com.medicareplus.backend.entity.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentResponse(
        Long id,
        String appointmentCode,
        Long patientId,
        String patientName,
        Long doctorId,
        String doctorName,
        String serviceType,
        LocalDate appointmentDate,
        LocalTime appointmentTime,
        String status,
        String notes
) {
    public static AppointmentResponse from(Appointment a) {
        return new AppointmentResponse(
                a.getId(), a.getAppointmentCode(),
                a.getPatient().getId(), a.getPatient().getFullName(),
                a.getDoctor().getId(), a.getDoctor().getFullName(),
                a.getServiceType(), a.getAppointmentDate(), a.getAppointmentTime(),
                a.getStatus().name(), a.getNotes()
        );
    }
}
