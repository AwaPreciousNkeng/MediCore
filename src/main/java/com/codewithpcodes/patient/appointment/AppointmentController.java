package com.codewithpcodes.patient.appointment;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("appointments")
@Tag(name = "appointment")
public class AppointmentController {
    private final AppointmentService service;

    @PostMapping("/schedule-appointment")
    public ResponseEntity<Long> scheduleAppointment(
            @Valid @RequestBody AppointmentRequest request
    ) {
        return ResponseEntity.ok(service.scheduleAppointment(request));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        return ResponseEntity.ok(service.getAllAppointments());
    }
}
