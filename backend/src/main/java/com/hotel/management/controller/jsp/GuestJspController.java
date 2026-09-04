package com.hotel.management.controller.jsp;

import com.hotel.management.model.Booking;
import com.hotel.management.model.Room;
import com.hotel.management.model.ServiceRequest;
import com.hotel.management.model.User;
import com.hotel.management.service.BookingService;
import com.hotel.management.service.HotelServiceRequestService;
import com.hotel.management.service.RoomService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/guest")
public class GuestJspController {

    private final RoomService roomService;
    private final BookingService bookingService;
    private final HotelServiceRequestService serviceRequestService;

    @Autowired
    public GuestJspController(RoomService roomService, BookingService bookingService, HotelServiceRequestService serviceRequestService) {
        this.roomService = roomService;
        this.bookingService = bookingService;
        this.serviceRequestService = serviceRequestService;
    }

    private User getLoggedUser(HttpSession session) {
        return (User) session.getAttribute("currentUser");
    }

    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {
        User user = getLoggedUser(session);
        if (user == null) return "redirect:/login";

        List<Booking> myBookings = bookingService.getBookingsByUserId(user.getId());
        List<ServiceRequest> myServices = serviceRequestService.getServicesByUserId(user.getId());
        List<Room> availableRooms = roomService.getAvailableRooms();

        model.addAttribute("user", user);
        model.addAttribute("bookings", myBookings);
        model.addAttribute("services", myServices);
        model.addAttribute("availableRooms", availableRooms);
        return "guest/dashboard";
    }

    @GetMapping("/rooms")
    public String browseRooms(Model model) {
        model.addAttribute("rooms", roomService.getAllRooms());
        return "guest/rooms";
    }

    @PostMapping("/book")
    public String bookRoom(
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(defaultValue = "1") Integer guestsCount,
            @RequestParam(required = false) String specialRequests,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        User user = getLoggedUser(session);
        if (user == null) return "redirect:/login";

        try {
            Booking booking = new Booking();
            booking.setCheckInDate(checkInDate);
            booking.setCheckOutDate(checkOutDate);
            booking.setGuestsCount(guestsCount);
            booking.setSpecialRequests(specialRequests);

            Booking created = bookingService.createBooking(user.getId(), roomId, booking);
            redirectAttributes.addFlashAttribute("success", "Room booked successfully! Booking Ref: " + created.getBookingReference());
            return "redirect:/guest/dashboard";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to book room: " + e.getMessage());
            return "redirect:/guest/rooms";
        }
    }

    @GetMapping("/bookings")
    public String myBookings(HttpSession session, Model model) {
        User user = getLoggedUser(session);
        if (user == null) return "redirect:/login";

        model.addAttribute("bookings", bookingService.getBookingsByUserId(user.getId()));
        return "guest/bookings";
    }

    @GetMapping("/invoice/{id}")
    public String viewInvoice(@PathVariable Long id, HttpSession session, Model model) {
        User user = getLoggedUser(session);
        if (user == null) return "redirect:/login";

        Booking booking = bookingService.getBookingById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        model.addAttribute("booking", booking);
        model.addAttribute("user", user);
        return "guest/invoice";
    }

    @GetMapping("/services")
    public String servicesPage(HttpSession session, Model model) {
        User user = getLoggedUser(session);
        if (user == null) return "redirect:/login";

        model.addAttribute("services", serviceRequestService.getServicesByUserId(user.getId()));
        model.addAttribute("userBookings", bookingService.getBookingsByUserId(user.getId()));
        return "guest/services";
    }

    @PostMapping("/services/request")
    public String createServiceRequest(
            @RequestParam String roomNumber,
            @RequestParam String serviceType,
            @RequestParam String description,
            @RequestParam(defaultValue = "MEDIUM") String priority,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        User user = getLoggedUser(session);
        if (user == null) return "redirect:/login";

        ServiceRequest request = new ServiceRequest();
        request.setRoomNumber(roomNumber);
        request.setServiceType(serviceType);
        request.setDescription(description);
        request.setPriority(priority);

        serviceRequestService.createServiceRequest(user.getId(), request);
        redirectAttributes.addFlashAttribute("success", "Service request submitted successfully!");
        return "redirect:/guest/services";
    }
}
