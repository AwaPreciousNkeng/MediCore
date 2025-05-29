package com.codewithpcodes.patient.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface PatientRepository extends JpaRepository<Patient, Integer>{

    @Query("""
        SELECT patient
        FROM Patient patient
        WHERE patient.personnel.id = :personnelId
        """)
    List<Patient> findPatientsByPersonnelId(Integer personnelId);
}
