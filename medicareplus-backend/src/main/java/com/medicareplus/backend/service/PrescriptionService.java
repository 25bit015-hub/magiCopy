package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.prescription.PrescriptionItemRequest;
import com.medicareplus.backend.dto.prescription.PrescriptionRequest;
import com.medicareplus.backend.dto.prescription.PrescriptionResponse;
import com.medicareplus.backend.entity.Consultation;
import com.medicareplus.backend.entity.Medicine;
import com.medicareplus.backend.entity.Prescription;
import com.medicareplus.backend.entity.PrescriptionItem;
import com.medicareplus.backend.repository.ConsultationRepository;
import com.medicareplus.backend.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final ConsultationRepository consultationRepository;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final MedicineService medicineService;

    public List<PrescriptionResponse> list() {
        return prescriptionRepository.findAll().stream().map(PrescriptionResponse::from).toList();
    }

    @Transactional
    public PrescriptionResponse create(PrescriptionRequest req) {
        Consultation consultation = req.consultationId() != null
                ? consultationRepository.findById(req.consultationId()).orElse(null)
                : null;

        Prescription prescription = Prescription.builder()
                .prescriptionCode(generateCode())
                .patient(patientService.findEntity(req.patientId()))
                .doctor(doctorService.findEntity(req.doctorId()))
                .consultation(consultation)
                .notes(req.notes())
                .prescriptionDate(LocalDateTime.now())
                .build();

        for (PrescriptionItemRequest itemReq : req.items()) {
            Medicine medicine = medicineService.findEntity(itemReq.medicineId());
            PrescriptionItem item = PrescriptionItem.builder()
                    .medicine(medicine)
                    .dosage(itemReq.dosage())
                    .frequency(itemReq.frequency())
                    .durationDays(itemReq.durationDays())
                    .quantity(itemReq.quantity() != null ? itemReq.quantity() : 1)
                    .build();
            prescription.addItem(item);
        }

        return PrescriptionResponse.from(prescriptionRepository.save(prescription));
    }

    private String generateCode() {
        long count = prescriptionRepository.count() + 1;
        return String.format("RX-%04d", count);
    }
}
