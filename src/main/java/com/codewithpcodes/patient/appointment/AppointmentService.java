package com.codewithpcodes.patient.appointment;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    public Long scheduleAppointment(AppointmentRequest request) {
        Appointment appointment = appointmentMapper.toAppointment(request);
        return appointmentRepository.save(appointment).getId();
    }

    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .toList();
    }

    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with Id:: " + id));
        return appointmentMapper.toAppointmentResponse(appointment);
    }

    public List<AppointmentResponse> getAppointmentsByPatientId(Integer patientId) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsByPatientId(patientId);
        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .toList();
    }

    public List<AppointmentResponse> getAppointmentsByPersonnelId(Integer personnelId) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsByPersonnelId(personnelId);
        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .toList();
    }

    public Void CancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with Id:: " + appointmentId));
        appointment.setStatus(AppointmentStatus.CANCELED);
        appointmentRepository.save(appointment);
        return null;
    }

    public Void completeAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("No appointment found with Id:: " + appointmentId));
        appointment.setStatus(AppointmentStatus.COMPLETED);
        return null;
    }
}
