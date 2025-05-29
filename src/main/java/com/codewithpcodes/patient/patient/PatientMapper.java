package com.codewithpcodes.patient.patient;

import com.codewithpcodes.patient.file.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientMapper {

    public Patient toPatient(PatientRequest request) {
        return Patient.builder()
                .id(request.id())
                .name(request.name())
                .email(request.email())
                .gender(request.gender())
                .address(request.address())
                .dateOfBirth(request.dateOfBirth())
                .phoneNumber(request.phoneNumber())
                .build();
    }

    public PatientResponse toPatientResponse(Patient patient) {
        return PatientResponse.builder()
                .id(patient.getId())
                .name(patient.getName())
                .gender(patient.getGender())
                .dateOfBirth(patient.getDateOfBirth())
                .address(patient.getAddress())
                .phoneNumber(patient.getPhoneNumber())
                .email(patient.getEmail())
                .patientFile(FileUtils.readFileFromLocation(patient.getPatientFile()))
                .build();
    }


}
