package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.invoice.InvoiceRequest;
import com.medicareplus.backend.dto.invoice.InvoiceResponse;
import com.medicareplus.backend.enums.InvoiceStatus;
import com.medicareplus.backend.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {

    private final InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<InvoiceResponse>> list() {
        return ResponseEntity.ok(invoiceService.list());
    }

    @PostMapping
    public ResponseEntity<InvoiceResponse> create(@Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.create(request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<InvoiceResponse> updateStatus(@PathVariable Long id, @RequestParam InvoiceStatus status) {
        return ResponseEntity.ok(invoiceService.updateStatus(id, status));
    }
}
