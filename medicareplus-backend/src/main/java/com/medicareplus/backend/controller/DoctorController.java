package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.doctor.DoctorRequest;
import com.medicareplus.backend.dto.doctor.DoctorResponse;
import com.medicareplus.backend.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> list() {
        return ResponseEntity.ok(doctorService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.get(id));
    }

    @PostMapping
    public ResponseEntity<DoctorResponse> create(@Valid @RequestBody DoctorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponse> update(@PathVariable Long id, @Valid @RequestBody DoctorRequest request) {
        return ResponseEntity.ok(doctorService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        doctorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
