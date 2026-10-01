package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.doctor.DoctorRequest;
import com.medicareplus.backend.dto.doctor.DoctorResponse;
import com.medicareplus.backend.entity.Doctor;
import com.medicareplus.backend.entity.User;
import com.medicareplus.backend.enums.DoctorStatus;
import com.medicareplus.backend.exception.ResourceNotFoundException;
import com.medicareplus.backend.repository.DoctorRepository;
import com.medicareplus.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public List<DoctorResponse> list() {
        return doctorRepository.findAll().stream().map(DoctorResponse::from).toList();
    }

    public DoctorResponse get(Long id) {
        return DoctorResponse.from(findEntity(id));
    }

    public Doctor findEntity(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Daktari hakupatikana: " + id));
    }

    @Transactional
    public DoctorResponse create(DoctorRequest req) {
        User user = null;
        if (req.userId() != null) {
            user = userRepository.findById(req.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("Mtumiaji hakupatikana: " + req.userId()));
        }
        Doctor doctor = Doctor.builder()
                .doctorCode(generateCode())
                .user(user)
                .fullName(req.fullName())
                .specialization(req.specialization())
                .experienceYears(req.experienceYears())
                .phone(req.phone())
                .email(req.email())
                .rating(req.rating() != null ? req.rating() : 5.0)
                .status(req.status() != null ? req.status() : DoctorStatus.AVAILABLE)
                .patientsCount(0)
                .colorTag(req.colorTag() != null ? req.colorTag() : "#3b82f6")
                .build();
        return DoctorResponse.from(doctorRepository.save(doctor));
    }

    @Transactional
    public DoctorResponse update(Long id, DoctorRequest req) {
        Doctor doctor = findEntity(id);
        doctor.setFullName(req.fullName());
        doctor.setSpecialization(req.specialization());
        doctor.setExperienceYears(req.experienceYears());
        doctor.setPhone(req.phone());
        doctor.setEmail(req.email());
        if (req.rating() != null) doctor.setRating(req.rating());
        if (req.status() != null) doctor.setStatus(req.status());
        if (req.colorTag() != null) doctor.setColorTag(req.colorTag());
        return DoctorResponse.from(doctorRepository.save(doctor));
    }

    @Transactional
    public void delete(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Daktari hakupatikana: " + id);
        }
        doctorRepository.deleteById(id);
    }

    private String generateCode() {
        long count = doctorRepository.count() + 201;
        return "D-" + count;
    }
}
