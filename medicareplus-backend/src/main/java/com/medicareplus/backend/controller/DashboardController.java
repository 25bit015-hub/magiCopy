package com.medicareplus.backend.controller;

import com.medicareplus.backend.dto.dashboard.*;
import com.medicareplus.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsResponse> stats() {
        return ResponseEntity.ok(dashboardService.stats());
    }

    @GetMapping("/reports/revenue")
    public ResponseEntity<List<RevenuePointResponse>> revenue() {
        return ResponseEntity.ok(dashboardService.weeklyRevenue());
    }

    @GetMapping("/reports/demographics")
    public ResponseEntity<List<DemographicResponse>> demographics() {
        return ResponseEntity.ok(dashboardService.demographics());
    }

    @GetMapping("/reports/patient-registration")
    public ResponseEntity<List<PatientRegistrationPointResponse>> patientRegistration() {
        return ResponseEntity.ok(dashboardService.patientRegistrationTrend());
    }

    @GetMapping("/reports/appointment-stats")
    public ResponseEntity<List<AppointmentStatPointResponse>> appointmentStats() {
        return ResponseEntity.ok(dashboardService.appointmentStats());
    }
}
