package com.hotel.management.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "check_in_records")
public class CheckInRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(name = "guest_name", nullable = false, length = 100)
    private String guestName;

    @Column(name = "room_number", nullable = false, length = 20)
    private String roomNumber;

    @Column(name = "id_proof_type", length = 50)
    private String idProofType; // Passport, Driver License, National ID

    @Column(name = "id_proof_number", length = 50)
    private String idProofNumber;

    @Column(name = "check_in_time")
    private LocalDateTime checkInTime = LocalDateTime.now();

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @Column(name = "staff_in_charge", length = 100)
    private String staffInCharge;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public CheckInRecord() {}

    public CheckInRecord(Booking booking, String guestName, String roomNumber, String idProofType, String idProofNumber, String staffInCharge, String notes) {
        this.booking = booking;
        this.guestName = guestName;
        this.roomNumber = roomNumber;
        this.idProofType = idProofType;
        this.idProofNumber = idProofNumber;
        this.staffInCharge = staffInCharge;
        this.notes = notes;
        this.checkInTime = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getIdProofType() { return idProofType; }
    public void setIdProofType(String idProofType) { this.idProofType = idProofType; }

    public String getIdProofNumber() { return idProofNumber; }
    public void setIdProofNumber(String idProofNumber) { this.idProofNumber = idProofNumber; }

    public LocalDateTime getCheckInTime() { return checkInTime; }
    public void setCheckInTime(LocalDateTime checkInTime) { this.checkInTime = checkInTime; }

    public LocalDateTime getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(LocalDateTime checkOutTime) { this.checkOutTime = checkOutTime; }

    public String getStaffInCharge() { return staffInCharge; }
    public void setStaffInCharge(String staffInCharge) { this.staffInCharge = staffInCharge; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
