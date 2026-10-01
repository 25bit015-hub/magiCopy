package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.medicine.MedicineRequest;
import com.medicareplus.backend.dto.medicine.MedicineResponse;
import com.medicareplus.backend.service.MedicineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping
    public ResponseEntity<List<MedicineResponse>> list() {
        return ResponseEntity.ok(medicineService.list());
    }

    @PostMapping
    public ResponseEntity<MedicineResponse> create(@Valid @RequestBody MedicineRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medicineService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineResponse> update(@PathVariable Long id, @Valid @RequestBody MedicineRequest request) {
        return ResponseEntity.ok(medicineService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        medicineService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
