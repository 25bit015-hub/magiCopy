package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.patient.PatientRequest;
import com.medicareplus.backend.dto.patient.PatientResponse;
import com.medicareplus.backend.entity.Patient;
import com.medicareplus.backend.enums.PatientStatus;
import com.medicareplus.backend.exception.ResourceNotFoundException;
import com.medicareplus.backend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public List<PatientResponse> list() {
        return patientRepository.findAll().stream().map(PatientResponse::from).toList();
    }

    public PatientResponse get(Long id) {
        return PatientResponse.from(findEntity(id));
    }

    public Patient findEntity(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mgonjwa hakupatikana: " + id));
    }

    @Transactional
    public PatientResponse create(PatientRequest req) {
        Patient patient = Patient.builder()
                .patientCode(generateCode())
                .fullName(req.fullName())
                .gender(req.gender())
                .age(req.age())
                .phone(req.phone())
                .email(req.email())
                .address(req.address())
                .bloodGroup(req.bloodGroup())
                .status(req.status() != null ? req.status() : PatientStatus.ACTIVE)
                .lastVisit(LocalDate.now())
                .build();
        return PatientResponse.from(patientRepository.save(patient));
    }

    @Transactional
    public PatientResponse update(Long id, PatientRequest req) {
        Patient patient = findEntity(id);
        patient.setFullName(req.fullName());
        patient.setGender(req.gender());
        patient.setAge(req.age());
        patient.setPhone(req.phone());
        patient.setEmail(req.email());
        patient.setAddress(req.address());
        patient.setBloodGroup(req.bloodGroup());
        if (req.status() != null) patient.setStatus(req.status());
        return PatientResponse.from(patientRepository.save(patient));
    }

    @Transactional
    public void delete(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Mgonjwa hakupatikana: " + id);
        }
        patientRepository.deleteById(id);
    }

    private String generateCode() {
        long count = patientRepository.count() + 1001;
        return "P-" + count;
    }
}
