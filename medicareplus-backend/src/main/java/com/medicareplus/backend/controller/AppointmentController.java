package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.appointment.AppointmentRequest;
import com.medicareplus.backend.dto.appointment.AppointmentResponse;
import com.medicareplus.backend.enums.AppointmentStatus;
import com.medicareplus.backend.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> list(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(date != null ? appointmentService.listByDate(date) : appointmentService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.get(id));
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> create(@Valid @RequestBody AppointmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> update(@PathVariable Long id, @Valid @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.update(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
