package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.consultation.ConsultationRequest;
import com.medicareplus.backend.dto.consultation.ConsultationResponse;
import com.medicareplus.backend.entity.Appointment;
import com.medicareplus.backend.entity.Consultation;
import com.medicareplus.backend.repository.ConsultationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final AppointmentService appointmentService;

    public List<ConsultationResponse> list() {
        return consultationRepository.findAll().stream().map(ConsultationResponse::from).toList();
    }

    @Transactional
    public ConsultationResponse create(ConsultationRequest req) {
        Appointment appointment = req.appointmentId() != null
                ? appointmentService.findEntity(req.appointmentId())
                : null;

        Consultation consultation = Consultation.builder()
                .patient(patientService.findEntity(req.patientId()))
                .doctor(doctorService.findEntity(req.doctorId()))
                .appointment(appointment)
                .symptoms(req.symptoms())
                .diagnosis(req.diagnosis())
                .notes(req.notes())
                .consultationDate(LocalDateTime.now())
                .build();
        return ConsultationResponse.from(consultationRepository.save(consultation));
    }
}
