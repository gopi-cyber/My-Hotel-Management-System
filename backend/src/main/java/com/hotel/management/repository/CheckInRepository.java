package com.hotel.management.repository;

import com.hotel.management.model.CheckInRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckInRepository extends JpaRepository<CheckInRecord, Long> {
    List<CheckInRecord> findByRoomNumber(String roomNumber);
    Optional<CheckInRecord> findByBookingId(Long bookingId);
    List<CheckInRecord> findAllByOrderByCheckInTimeDesc();
}
