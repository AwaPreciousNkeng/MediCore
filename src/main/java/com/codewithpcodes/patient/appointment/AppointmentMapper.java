package com.codewithpcodes.patient.appointment;

import com.codewithpcodes.patient.patient.Patient;
import com.codewithpcodes.patient.patient.PatientResponse;
import com.codewithpcodes.patient.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AppointmentMapper {
    public Appointment toAppointment(AppointmentRequest request) {
        return Appointment.builder()
                .id(request.id())
                .patient(Patient.builder().id(request.patientId()).build())
                .personnel(User.builder().id(request.personnelId()).build())
                .appointmentDate(LocalDateTime.now())
                .reason(request.reason())
                .status(AppointmentStatus.SCHEDULED)
                .build();
    }

    public AppointmentResponse toAppointmentResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .reason(appointment.getReason())
                .patientName(appointment.getPatient().getName())
                .personnelName(appointment.getPersonnel().getName())
                .build();
    }
}
