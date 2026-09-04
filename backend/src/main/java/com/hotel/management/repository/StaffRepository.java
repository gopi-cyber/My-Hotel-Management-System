package com.hotel.management.repository;

import com.hotel.management.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmail(String email);
    List<Staff> findByDepartment(String department);
    List<Staff> findByStatus(String status);
    List<Staff> findByShift(String shift);
}
