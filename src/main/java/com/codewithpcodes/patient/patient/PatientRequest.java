package com.codewithpcodes.patient.patient;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;


public record PatientRequest(
        Integer id,
        @NotNull(message = "Patient's full name is required")
        @NotEmpty(message = "Patient's full name is required")
        String name,
        @NotNull(message = "Patient's gender is required")
        @NotEmpty(message = "Patient's gender is required")
        Gender gender,
        @NotNull(message = "Patient's date of birth is required")
        @NotEmpty(message = "Patient's date of birth is required")
        LocalDate dateOfBirth,
        @NotNull(message = "Patient's address is required")
        @NotEmpty(message = "Patient's address is required")
        String address,
        String email,
        String phoneNumber

) {
}
