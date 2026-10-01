package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.appointment.AppointmentRequest;
import com.medicareplus.backend.dto.appointment.AppointmentResponse;
import com.medicareplus.backend.entity.Appointment;
import com.medicareplus.backend.entity.Doctor;
import com.medicareplus.backend.entity.Patient;
import com.medicareplus.backend.enums.AppointmentStatus;
import com.medicareplus.backend.exception.ResourceNotFoundException;
import com.medicareplus.backend.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientService patientService;
    private final DoctorService doctorService;

    public List<AppointmentResponse> list() {
        return appointmentRepository.findAll().stream().map(AppointmentResponse::from).toList();
    }

    public List<AppointmentResponse> listByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date).stream()
                .map(AppointmentResponse::from).toList();
    }

    public AppointmentResponse get(Long id) {
        return AppointmentResponse.from(findEntity(id));
    }

    public Appointment findEntity(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Miadi haikupatikana: " + id));
    }

    @Transactional
    public AppointmentResponse create(AppointmentRequest req) {
        Patient patient = patientService.findEntity(req.patientId());
        Doctor doctor = doctorService.findEntity(req.doctorId());

        Appointment appointment = Appointment.builder()
                .appointmentCode(generateCode())
                .patient(patient)
                .doctor(doctor)
                .serviceType(req.serviceType())
                .appointmentDate(req.appointmentDate())
                .appointmentTime(req.appointmentTime())
                .status(req.status() != null ? req.status() : AppointmentStatus.PENDING)
                .notes(req.notes())
                .build();
        return AppointmentResponse.from(appointmentRepository.save(appointment));
    }

    @Transactional
    public AppointmentResponse updateStatus(Long id, AppointmentStatus status) {
        Appointment appointment = findEntity(id);
        appointment.setStatus(status);
        return AppointmentResponse.from(appointmentRepository.save(appointment));
    }

    @Transactional
    public AppointmentResponse update(Long id, AppointmentRequest req) {
        Appointment appointment = findEntity(id);
        appointment.setPatient(patientService.findEntity(req.patientId()));
        appointment.setDoctor(doctorService.findEntity(req.doctorId()));
        appointment.setServiceType(req.serviceType());
        appointment.setAppointmentDate(req.appointmentDate());
        appointment.setAppointmentTime(req.appointmentTime());
        if (req.status() != null) appointment.setStatus(req.status());
        appointment.setNotes(req.notes());
        return AppointmentResponse.from(appointmentRepository.save(appointment));
    }

    @Transactional
    public void delete(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Miadi haikupatikana: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    private String generateCode() {
        long count = appointmentRepository.count() + 10231;
        return "A-" + count;
    }
}
