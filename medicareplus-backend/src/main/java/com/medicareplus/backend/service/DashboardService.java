package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.dashboard.*;
import com.medicareplus.backend.entity.Appointment;
import com.medicareplus.backend.entity.Invoice;
import com.medicareplus.backend.entity.Patient;
import com.medicareplus.backend.enums.AppointmentStatus;
import com.medicareplus.backend.enums.InvoiceStatus;
import com.medicareplus.backend.enums.PatientStatus;
import com.medicareplus.backend.repository.AppointmentRepository;
import com.medicareplus.backend.repository.DoctorRepository;
import com.medicareplus.backend.repository.InvoiceRepository;
import com.medicareplus.backend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final InvoiceRepository invoiceRepository;

    public DashboardStatsResponse stats() {
        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long todayAppointments = appointmentRepository.countByAppointmentDate(LocalDate.now());

        BigDecimal revenue = invoiceRepository.findAll().stream()
                .filter(i -> i.getStatus() == InvoiceStatus.PAID)
                .map(Invoice::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Change percentages vs. a naive baseline (placeholder until historical snapshots exist).
        return new DashboardStatsResponse(totalPatients, todayAppointments, totalDoctors, revenue,
                12.5, 8.2, 3.8, 18.4);
    }

    /** Revenue and appointment counts for the last 7 days, labelled by weekday. */
    public List<RevenuePointResponse> weeklyRevenue() {
        LocalDate start = LocalDate.now().minusDays(6);
        List<Invoice> invoices = invoiceRepository.findByInvoiceDateBetween(start, LocalDate.now());
        List<Appointment> appointments = appointmentRepository.findAll();

        return start.datesUntil(LocalDate.now().plusDays(1))
                .map(date -> {
                    BigDecimal dayRevenue = invoices.stream()
                            .filter(i -> i.getInvoiceDate().equals(date) && i.getStatus() == InvoiceStatus.PAID)
                            .map(Invoice::getAmount)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);
                    long dayAppointments = appointments.stream()
                            .filter(a -> a.getAppointmentDate().equals(date))
                            .count();
                    String label = date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                    return new RevenuePointResponse(label, dayRevenue, dayAppointments);
                })
                .collect(Collectors.toList());
    }

    public List<DemographicResponse> demographics() {
        List<Patient> patients = patientRepository.findAll();
        long total = Math.max(patients.size(), 1);
        long pediatrics = patients.stream().filter(p -> p.getAge() != null && p.getAge() < 18).count();
        long seniors = patients.stream().filter(p -> p.getAge() != null && p.getAge() >= 60).count();
        long adults = total - pediatrics - seniors;

        return List.of(
                new DemographicResponse("Pediatrics", pediatrics, "#3b82f6"),
                new DemographicResponse("Adults", Math.max(adults, 0), "#0d9488"),
                new DemographicResponse("Seniors", seniors, "#f59e0b")
        );
    }

    /** New patient registrations for each of the last 6 months. */
    public List<PatientRegistrationPointResponse> patientRegistrationTrend() {
        List<Patient> patients = patientRepository.findAll();
        LocalDate now = LocalDate.now();

        return java.util.stream.IntStream.rangeClosed(0, 5)
                .mapToObj(now::minusMonths)
                .sorted()
                .map(month -> {
                    long count = patients.stream()
                            .filter(p -> p.getCreatedAt() != null
                                    && p.getCreatedAt().getMonthValue() == month.getMonthValue()
                                    && p.getCreatedAt().getYear() == month.getYear())
                            .count();
                    String label = month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                    return new PatientRegistrationPointResponse(label, count);
                })
                .toList();
    }

    /** Appointment status breakdown for the last 7 days, labelled by weekday. */
    public List<AppointmentStatPointResponse> appointmentStats() {
        LocalDate start = LocalDate.now().minusDays(6);
        List<Appointment> appointments = appointmentRepository.findAll();

        return start.datesUntil(LocalDate.now().plusDays(1))
                .map(date -> {
                    List<Appointment> dayAppointments = appointments.stream()
                            .filter(a -> a.getAppointmentDate().equals(date))
                            .toList();
                    long confirmed = dayAppointments.stream().filter(a -> a.getStatus() == AppointmentStatus.CONFIRMED || a.getStatus() == AppointmentStatus.COMPLETED).count();
                    long pending = dayAppointments.stream().filter(a -> a.getStatus() == AppointmentStatus.PENDING).count();
                    long cancelled = dayAppointments.stream().filter(a -> a.getStatus() == AppointmentStatus.CANCELLED).count();
                    String label = date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                    return new AppointmentStatPointResponse(label, confirmed, pending, cancelled);
                })
                .toList();
    }
}
