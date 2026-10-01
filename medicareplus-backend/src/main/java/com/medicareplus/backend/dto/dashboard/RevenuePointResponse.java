package com.medicareplus.backend.dto.dashboard;

import java.math.BigDecimal;

public record RevenuePointResponse(String label, BigDecimal revenue, long appointments) {}
