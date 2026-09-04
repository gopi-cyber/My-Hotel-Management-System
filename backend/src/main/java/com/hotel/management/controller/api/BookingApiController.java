package com.hotel.management.controller.api;

import com.hotel.management.model.Booking;
import com.hotel.management.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings API", description = "Hotel booking and reservation operations")
public class BookingApiController {

    private final BookingService bookingService;

    @Autowired
    public BookingApiController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    @Operation(summary = "Get all bookings or filter by userId")
    public ResponseEntity<List<Booking>> getBookings(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
        }
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get booking by ID")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create a new booking")
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long userId,
            @RequestParam Long roomId,
            @RequestBody Booking bookingData) {
        Booking created = bookingService.createBooking(userId, roomId, bookingData);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update booking status (CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED)")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }

    @PatchMapping("/{id}/payment")
    @Operation(summary = "Update payment status (PAID, UNPAID, REFUNDED)")
    public ResponseEntity<Booking> updatePayment(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String paymentStatus = payload.get("paymentStatus");
        return ResponseEntity.ok(bookingService.updatePaymentStatus(id, paymentStatus));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete booking")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
