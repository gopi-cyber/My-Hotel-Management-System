package com.hotel.management.service;

import com.hotel.management.model.Staff;
import com.hotel.management.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StaffService {

    private final StaffRepository staffRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(Long id) {
        return staffRepository.findById(id);
    }

    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff updatedStaff) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Staff member not found with id: " + id));

        staff.setName(updatedStaff.getName());
        staff.setEmail(updatedStaff.getEmail());
        staff.setPhone(updatedStaff.getPhone());
        staff.setRole(updatedStaff.getRole());
        staff.setDepartment(updatedStaff.getDepartment());
        staff.setShift(updatedStaff.getShift());
        staff.setSalary(updatedStaff.getSalary());
        staff.setStatus(updatedStaff.getStatus());
        if (updatedStaff.getHireDate() != null) {
            staff.setHireDate(updatedStaff.getHireDate());
        }
        return staffRepository.save(staff);
    }

    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }

    public List<Staff> getStaffByDepartment(String department) {
        return staffRepository.findByDepartment(department);
    }
}
