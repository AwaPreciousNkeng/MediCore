package com.codewithpcodes.patient.patient;

import org.springframework.data.jpa.domain.Specification;

public class PatientSpecification {

    public static Specification<Patient> withPersonnelId(Integer personnelId) {
        return ((root, query, cb) -> cb.equal(root.get("personnel").get("id"), personnelId) );
    }
}
