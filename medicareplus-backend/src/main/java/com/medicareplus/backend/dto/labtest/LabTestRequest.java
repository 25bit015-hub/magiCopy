package com.medicareplus.backend.dto.labtest;

import com.medicareplus.backend.enums.LabTestStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record LabTestRequest(
        @NotNull Long patientId,
        @NotNull Long doctorId,
        @NotBlank String testName,
        LocalDate requestedDate,
        LabTestStatus status,
        String result
) {}
