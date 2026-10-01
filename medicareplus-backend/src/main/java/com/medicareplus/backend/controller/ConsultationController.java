package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.consultation.ConsultationRequest;
import com.medicareplus.backend.dto.consultation.ConsultationResponse;
import com.medicareplus.backend.service.ConsultationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultations")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationService consultationService;

    @GetMapping
    public ResponseEntity<List<ConsultationResponse>> list() {
        return ResponseEntity.ok(consultationService.list());
    }

    @PostMapping
    public ResponseEntity<ConsultationResponse> create(@Valid @RequestBody ConsultationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(consultationService.create(request));
    }
}
