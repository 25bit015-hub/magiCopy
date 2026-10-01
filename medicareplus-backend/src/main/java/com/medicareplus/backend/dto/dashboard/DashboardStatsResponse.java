package com.medicareplus.backend.dto.dashboard;

import java.math.BigDecimal;

public record DashboardStatsResponse(
        long totalPatients,
        long todayAppointments,
        long totalDoctors,
        BigDecimal revenue,
        double patientsChange,
        double appointmentsChange,
        double doctorsChange,
        double revenueChange
) {}
