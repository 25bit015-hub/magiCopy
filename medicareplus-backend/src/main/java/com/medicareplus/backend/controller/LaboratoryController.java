package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.labtest.LabTestRequest;
import com.medicareplus.backend.dto.labtest.LabTestResponse;
import com.medicareplus.backend.enums.LabTestStatus;
import com.medicareplus.backend.service.LabTestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/laboratory")
@RequiredArgsConstructor
public class LaboratoryController {

    private final LabTestService labTestService;

    @GetMapping
    public ResponseEntity<List<LabTestResponse>> list() {
        return ResponseEntity.ok(labTestService.list());
    }

    @PostMapping
    public ResponseEntity<LabTestResponse> create(@Valid @RequestBody LabTestRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(labTestService.create(request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<LabTestResponse> updateResult(@PathVariable Long id,
                                                          @RequestParam(required = false) LabTestStatus status,
                                                          @RequestParam(required = false) String result) {
        return ResponseEntity.ok(labTestService.updateResult(id, status, result));
    }
}
