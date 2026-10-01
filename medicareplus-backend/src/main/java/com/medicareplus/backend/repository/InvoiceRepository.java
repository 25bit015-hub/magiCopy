package com.medicareplus.backend.repository;

import com.medicareplus.backend.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Optional<Invoice> findByInvoiceCode(String invoiceCode);
    List<Invoice> findByInvoiceDateBetween(LocalDate start, LocalDate end);
}
