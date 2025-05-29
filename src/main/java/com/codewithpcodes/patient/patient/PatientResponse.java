package com.codewithpcodes.patient.patient;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientResponse {
    private Integer id;
    private String name;
    private Gender gender;
    private String address;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String email;
    private byte[] patientFile;
}
