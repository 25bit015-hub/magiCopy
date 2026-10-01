package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.invoice.InvoiceRequest;
import com.medicareplus.backend.dto.invoice.InvoiceResponse;
import com.medicareplus.backend.entity.Invoice;
import com.medicareplus.backend.enums.InvoiceStatus;
import com.medicareplus.backend.exception.ResourceNotFoundException;
import com.medicareplus.backend.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final PatientService patientService;

    public List<InvoiceResponse> list() {
        return invoiceRepository.findAll().stream().map(InvoiceResponse::from).toList();
    }

    public Invoice findEntity(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ankara haikupatikana: " + id));
    }

    @Transactional
    public InvoiceResponse create(InvoiceRequest req) {
        Invoice invoice = Invoice.builder()
                .invoiceCode(generateCode())
                .patient(patientService.findEntity(req.patientId()))
                .serviceDescription(req.serviceDescription())
                .amount(req.amount())
                .invoiceDate(req.invoiceDate() != null ? req.invoiceDate() : LocalDate.now())
                .status(req.status() != null ? req.status() : InvoiceStatus.PENDING)
                .method(req.method())
                .build();
        return InvoiceResponse.from(invoiceRepository.save(invoice));
    }

    @Transactional
    public InvoiceResponse updateStatus(Long id, InvoiceStatus status) {
        Invoice invoice = findEntity(id);
        invoice.setStatus(status);
        return InvoiceResponse.from(invoiceRepository.save(invoice));
    }

    private String generateCode() {
        long count = invoiceRepository.count() + 8801;
        return "INV-" + count;
    }
}
