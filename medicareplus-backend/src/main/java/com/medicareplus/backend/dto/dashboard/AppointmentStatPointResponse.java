package com.medicareplus.backend.dto.dashboard;

public record AppointmentStatPointResponse(String name, long confirmed, long pending, long cancelled) {}
