package com.codewithpcodes.patient.patient;

import com.codewithpcodes.patient.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final FileStorageService fileStorageService;
    private Patient getPatient(Integer patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("No patient found with Id:: " + patientId));
    }

    public Integer save(PatientRequest request, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Patient patient = patientMapper.toPatient(request);
        patient.setPersonnel(user);
        patientRepository.save(patient);
        return patient.getId();
    }

    public List<PatientResponse> findAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream()
                .map(patientMapper::toPatientResponse)
                .toList();
    }
    public PatientResponse findById(Integer patientId) {
        return patientRepository.findById(patientId)
                .map(patientMapper::toPatientResponse)
                .orElseThrow(() -> new EntityNotFoundException("No patient found with Id:: " + patientId));
    }

    public void uploadPatientFile(Integer patientId, MultipartFile file, Authentication connectedUser) {
        //find patient
        Patient patient = getPatient(patientId);
        User user = (User) connectedUser.getPrincipal();
        var patientFile = fileStorageService.saveFile(file, user.getId());
        patient.setPatientFile(patientFile);
        patientRepository.save(patient);
    }

    public List<PatientResponse> findAllPatientsByPersonnel(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
       List<Patient> patients = patientRepository.findPatientsByPersonnelId(user.getId());
        return patients.stream()
                .map(patientMapper::toPatientResponse)
                .toList();
    }

}
