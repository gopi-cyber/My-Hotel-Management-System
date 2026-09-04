package com.hotel.management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Staff name is required")
    @Column(nullable = false, length = 100)
    private String name;

    @Email(message = "Valid email is required")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Column(nullable = false, length = 20)
    private String phone;

    @NotBlank(message = "Role is required")
    @Column(nullable = false, length = 50)
    private String role; // e.g. Front Desk Lead, Housekeeping, Chef, Manager

    @NotBlank(message = "Department is required")
    @Column(nullable = false, length = 50)
    private String department; // Reception, Housekeeping, Kitchen, Maintenance

    @Column(nullable = false, length = 30)
    private String shift = "Morning"; // Morning, Evening, Night

    @NotNull(message = "Salary is required")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal salary = BigDecimal.ZERO;

    @Column(nullable = false, length = 30)
    private String status = "Active"; // Active, On Leave, Inactive

    @Column(name = "hire_date")
    private LocalDate hireDate = LocalDate.now();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Staff() {}

    public Staff(String name, String email, String phone, String role, String department, String shift, BigDecimal salary, String status, LocalDate hireDate) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.department = department;
        this.shift = shift;
        this.salary = salary;
        this.status = status != null ? status : "Active";
        this.hireDate = hireDate != null ? hireDate : LocalDate.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getShift() { return shift; }
    public void setShift(String shift) { this.shift = shift; }

    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getHireDate() { return hireDate; }
    public void setHireDate(LocalDate hireDate) { this.hireDate = hireDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
