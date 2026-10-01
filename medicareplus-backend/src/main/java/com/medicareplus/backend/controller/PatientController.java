package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.patient.PatientRequest;
import com.medicareplus.backend.dto.patient.PatientResponse;
import com.medicareplus.backend.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientResponse>> list() {
        return ResponseEntity.ok(patientService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.get(id));
    }

    @PostMapping
    public ResponseEntity<PatientResponse> create(@Valid @RequestBody PatientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(patientService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponse> update(@PathVariable Long id, @Valid @RequestBody PatientRequest request) {
        return ResponseEntity.ok(patientService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
