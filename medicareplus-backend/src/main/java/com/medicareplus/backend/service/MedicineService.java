package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.medicine.MedicineRequest;
import com.medicareplus.backend.dto.medicine.MedicineResponse;
import com.medicareplus.backend.entity.Medicine;
import com.medicareplus.backend.exception.ResourceNotFoundException;
import com.medicareplus.backend.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public List<MedicineResponse> list() {
        return medicineRepository.findAll().stream().map(MedicineResponse::from).toList();
    }

    public Medicine findEntity(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dawa haikupatikana: " + id));
    }

    @Transactional
    public MedicineResponse create(MedicineRequest req) {
        Medicine medicine = Medicine.builder()
                .medicineCode(generateCode())
                .name(req.name())
                .category(req.category())
                .batchNumber(req.batchNumber())
                .stockQuantity(req.stockQuantity() != null ? req.stockQuantity() : 0)
                .unitPrice(req.unitPrice())
                .expiryDate(req.expiryDate())
                .build();
        medicine.recomputeStatus();
        return MedicineResponse.from(medicineRepository.save(medicine));
    }

    @Transactional
    public MedicineResponse update(Long id, MedicineRequest req) {
        Medicine medicine = findEntity(id);
        medicine.setName(req.name());
        medicine.setCategory(req.category());
        medicine.setBatchNumber(req.batchNumber());
        if (req.stockQuantity() != null) medicine.setStockQuantity(req.stockQuantity());
        medicine.setUnitPrice(req.unitPrice());
        medicine.setExpiryDate(req.expiryDate());
        medicine.recomputeStatus();
        return MedicineResponse.from(medicineRepository.save(medicine));
    }

    @Transactional
    public void delete(Long id) {
        if (!medicineRepository.existsById(id)) {
            throw new ResourceNotFoundException("Dawa haikupatikana: " + id);
        }
        medicineRepository.deleteById(id);
    }

    private String generateCode() {
        long count = medicineRepository.count() + 1;
        return String.format("M-%03d", count);
    }
}
