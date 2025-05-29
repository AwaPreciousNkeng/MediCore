package com.codewithpcodes.patient.appointment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentResponse {

    private Long id;
    private String reason;
    private AppointmentStatus status;
    private String patientName;
    private String personnelName;
}
