package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.labtest.LabTestRequest;
import com.medicareplus.backend.dto.labtest.LabTestResponse;
import com.medicareplus.backend.entity.LabTest;
import com.medicareplus.backend.enums.LabTestStatus;
import com.medicareplus.backend.exception.ResourceNotFoundException;
import com.medicareplus.backend.repository.LabTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LabTestService {

    private final LabTestRepository labTestRepository;
    private final PatientService patientService;
    private final DoctorService doctorService;

    public List<LabTestResponse> list() {
        return labTestRepository.findAll().stream().map(LabTestResponse::from).toList();
    }

    public LabTest findEntity(Long id) {
        return labTestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kipimo hakikupatikana: " + id));
    }

    @Transactional
    public LabTestResponse create(LabTestRequest req) {
        LabTest labTest = LabTest.builder()
                .testCode(generateCode())
                .patient(patientService.findEntity(req.patientId()))
                .doctor(doctorService.findEntity(req.doctorId()))
                .testName(req.testName())
                .requestedDate(req.requestedDate() != null ? req.requestedDate() : LocalDate.now())
                .status(req.status() != null ? req.status() : LabTestStatus.PENDING)
                .result(req.result())
                .build();
        return LabTestResponse.from(labTestRepository.save(labTest));
    }

    @Transactional
    public LabTestResponse updateResult(Long id, LabTestStatus status, String result) {
        LabTest labTest = findEntity(id);
        if (status != null) labTest.setStatus(status);
        if (result != null) labTest.setResult(result);
        return LabTestResponse.from(labTestRepository.save(labTest));
    }

    private String generateCode() {
        long count = labTestRepository.count() + 5501;
        return "L-" + count;
    }
}
