package com.codewithpcodes.patient.record;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PatientRecordRepository extends JpaRepository<PatientRecord, Long> {

    @Query("""
            SELECT record
            FROM PatientRecord  record
            WHERE record.user.id = :userId
            AND record.patient.id = :patientId
            """)
    Optional<PatientRecord> findByPatientIdAndUserId(Integer patientId, Integer userId);

    @Query("""
            SELECT  record
            FROM PatientRecord  record
            WHERE record.patient.personnel.id = :patientId
            AND record.patient.id = :patientId
            """)
    Optional<PatientRecord> findByBookIdAndPersonnelId(Integer patientId, Integer personnelId);

}
