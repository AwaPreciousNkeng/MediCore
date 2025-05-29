package com.codewithpcodes.patient.patient;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("patients")
@RequiredArgsConstructor
@Tag(name = "Patient", description = "Patient API")
public class PatientController {
    private final PatientService service;

    @PostMapping
    public ResponseEntity<Integer> savePatient(
            @Valid @RequestBody PatientRequest request,
            Authentication connectedUser
            ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/{patient-id}")
    public ResponseEntity<PatientResponse> findPatientById (
            @PathVariable("patient-id") Integer patientId
    ) {
        return ResponseEntity.ok(service.findById(patientId));
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> findAllPatients() {
        return ResponseEntity.ok(service.findAllPatients());
    }

    @GetMapping("/personnel")
    public ResponseEntity<List<PatientResponse>> findPatientsByPersonnel(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllPatientsByPersonnel(connectedUser));
    }

    @PostMapping(value = "/patient-file/{patient-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPatientFilePicture(
            @PathVariable("patient-id") Integer patientId,
            @Parameter()
            @RequestPart("file")MultipartFile file,
            Authentication connectedUser
            ) {
        service.uploadPatientFile(patientId, file, connectedUser);
        return ResponseEntity.accepted().build();
    }

}
