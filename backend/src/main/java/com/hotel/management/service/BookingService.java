package com.hotel.management.service;

import com.hotel.management.model.Booking;
import com.hotel.management.model.Room;
import com.hotel.management.model.User;
import com.hotel.management.repository.BookingRepository;
import com.hotel.management.repository.RoomRepository;
import com.hotel.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Optional<Booking> getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Booking createBooking(Long userId, Long roomId, Booking bookingData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + roomId));

        long nights = ChronoUnit.DAYS.between(bookingData.getCheckInDate(), bookingData.getCheckOutDate());
        if (nights <= 0) {
            nights = 1;
        }

        BigDecimal total = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        bookingData.setUser(user);
        bookingData.setRoom(room);
        bookingData.setRoomNumber(room.getRoomNumber());
        bookingData.setRoomType(room.getType());
        bookingData.setGuestName(user.getName());
        bookingData.setGuestEmail(user.getEmail());
        bookingData.setGuestPhone(user.getPhone());
        bookingData.setNights((int) nights);
        bookingData.setTotalAmount(total);
        bookingData.setStatus("CONFIRMED");
        bookingData.setPaymentStatus("PAID");

        // Mark room as occupied if check-in is today
        room.setStatus("occupied");
        roomRepository.save(room);

        return bookingRepository.save(bookingData);
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + id));
        booking.setStatus(status);

        if ("CHECKED_OUT".equalsIgnoreCase(status) || "CANCELLED".equalsIgnoreCase(status)) {
            Room room = booking.getRoom();
            if (room != null) {
                room.setStatus("available");
                roomRepository.save(room);
            }
        }
        return bookingRepository.save(booking);
    }

    public Booking updatePaymentStatus(Long id, String paymentStatus) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + id));
        booking.setPaymentStatus(paymentStatus);
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
