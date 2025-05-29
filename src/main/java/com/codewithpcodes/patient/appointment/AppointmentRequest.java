package com.codewithpcodes.patient.appointment;

import java.time.LocalDateTime;

public record AppointmentRequest(
        Long id,
        Integer patientId,
        Integer personnelId,
        String reason
) {
}
