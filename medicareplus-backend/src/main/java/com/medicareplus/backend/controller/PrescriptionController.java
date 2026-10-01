package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.prescription.PrescriptionRequest;
import com.medicareplus.backend.dto.prescription.PrescriptionResponse;
import com.medicareplus.backend.service.PrescriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    @GetMapping
    public ResponseEntity<List<PrescriptionResponse>> list() {
        return ResponseEntity.ok(prescriptionService.list());
    }

    @PostMapping
    public ResponseEntity<PrescriptionResponse> create(@Valid @RequestBody PrescriptionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(prescriptionService.create(request));
    }
}
