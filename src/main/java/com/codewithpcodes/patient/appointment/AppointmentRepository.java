package com.codewithpcodes.patient.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("""
            SELECT appointment
            FROM Appointment appointment
            WHERE appointment.patient.id = :patientId
            """)
    List<Appointment> findAppointmentsByPatientId(Integer patientId);

    @Query("""
            SELECT appointment
            FROM Appointment appointment
            WHERE appointment.personnel.id = :personnelId
            """)
    List<Appointment> findAppointmentsByPersonnelId(Integer personnelId);
}
