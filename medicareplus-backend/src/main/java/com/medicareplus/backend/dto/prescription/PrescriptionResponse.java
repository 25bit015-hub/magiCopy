package com.medicareplus.backend.dto.prescription;

import com.medicareplus.backend.entity.Prescription;
import com.medicareplus.backend.entity.PrescriptionItem;

import java.time.LocalDateTime;
import java.util.List;

public record PrescriptionResponse(
        Long id,
        String prescriptionCode,
        Long patientId,
        String patientName,
        Long doctorId,
        String doctorName,
        String notes,
        LocalDateTime prescriptionDate,
        List<ItemView> items
) {
    public record ItemView(Long medicineId, String medicineName, String dosage, String frequency,
                            Integer durationDays, Integer quantity) {}

    public static PrescriptionResponse from(Prescription p) {
        List<ItemView> items = p.getItems().stream().map(PrescriptionResponse::toItemView).toList();
        return new PrescriptionResponse(
                p.getId(), p.getPrescriptionCode(),
                p.getPatient().getId(), p.getPatient().getFullName(),
                p.getDoctor().getId(), p.getDoctor().getFullName(),
                p.getNotes(), p.getPrescriptionDate(), items
        );
    }

    private static ItemView toItemView(PrescriptionItem i) {
        return new ItemView(i.getMedicine().getId(), i.getMedicine().getName(),
                i.getDosage(), i.getFrequency(), i.getDurationDays(), i.getQuantity());
    }
}
