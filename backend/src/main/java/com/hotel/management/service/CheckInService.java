package com.hotel.management.service;

import com.hotel.management.model.Booking;
import com.hotel.management.model.CheckInRecord;
import com.hotel.management.model.Room;
import com.hotel.management.repository.BookingRepository;
import com.hotel.management.repository.CheckInRepository;
import com.hotel.management.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CheckInService {

    private final CheckInRepository checkInRepository;
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public CheckInService(CheckInRepository checkInRepository, BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.checkInRepository = checkInRepository;
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    public List<CheckInRecord> getAllCheckIns() {
        return checkInRepository.findAllByOrderByCheckInTimeDesc();
    }

    public CheckInRecord processCheckIn(Long bookingId, String idProofType, String idProofNumber, String staffInCharge, String notes) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + bookingId));

        booking.setStatus("CHECKED_IN");
        bookingRepository.save(booking);

        Room room = booking.getRoom();
        if (room != null) {
            room.setStatus("occupied");
            roomRepository.save(room);
        }

        CheckInRecord record = new CheckInRecord(
                booking,
                booking.getGuestName(),
                booking.getRoomNumber(),
                idProofType,
                idProofNumber,
                staffInCharge,
                notes
        );

        return checkInRepository.save(record);
    }

    public CheckInRecord processCheckOut(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + bookingId));

        booking.setStatus("CHECKED_OUT");
        bookingRepository.save(booking);

        Room room = booking.getRoom();
        if (room != null) {
            room.setStatus("cleaning");
            roomRepository.save(room);
        }

        Optional<CheckInRecord> recordOpt = checkInRepository.findByBookingId(bookingId);
        if (recordOpt.isPresent()) {
            CheckInRecord record = recordOpt.get();
            record.setCheckOutTime(LocalDateTime.now());
            return checkInRepository.save(record);
        }

        return null;
    }
}
