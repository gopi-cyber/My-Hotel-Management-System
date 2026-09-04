package com.hotel.management.controller.jsp;

import com.hotel.management.model.Booking;
import com.hotel.management.model.Room;
import com.hotel.management.model.User;
import com.hotel.management.service.BookingService;
import com.hotel.management.service.CheckInService;
import com.hotel.management.service.HotelServiceRequestService;
import com.hotel.management.service.RoomService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/receptionist")
public class ReceptionistJspController {

    private final BookingService bookingService;
    private final RoomService roomService;
    private final CheckInService checkInService;
    private final HotelServiceRequestService serviceRequestService;

    @Autowired
    public ReceptionistJspController(BookingService bookingService, RoomService roomService,
                                     CheckInService checkInService, HotelServiceRequestService serviceRequestService) {
        this.bookingService = bookingService;
        this.roomService = roomService;
        this.checkInService = checkInService;
        this.serviceRequestService = serviceRequestService;
    }

    private boolean isReceptionistOrAdmin(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        return user != null && (user.getRole().name().equals("RECEPTIONIST") || user.getRole().name().equals("ADMIN"));
    }

    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {
        if (!isReceptionistOrAdmin(session)) return "redirect:/login";

        List<Booking> allBookings = bookingService.getAllBookings();
        List<Room> allRooms = roomService.getAllRooms();

        model.addAttribute("bookings", allBookings);
        model.addAttribute("rooms", allRooms);
        model.addAttribute("checkIns", checkInService.getAllCheckIns());
        model.addAttribute("services", serviceRequestService.getAllServices());
        return "receptionist/dashboard";
    }

    @PostMapping("/checkin")
    public String processCheckIn(
            @RequestParam Long bookingId,
            @RequestParam(required = false) String idProofType,
            @RequestParam(required = false) String idProofNumber,
            @RequestParam(required = false) String notes,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        if (!isReceptionistOrAdmin(session)) return "redirect:/login";

        User staff = (User) session.getAttribute("currentUser");
        try {
            checkInService.processCheckIn(bookingId, idProofType, idProofNumber, staff.getName(), notes);
            redirectAttributes.addFlashAttribute("success", "Guest checked in successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Check-in failed: " + e.getMessage());
        }
        return "redirect:/receptionist/dashboard";
    }

    @PostMapping("/checkout/{bookingId}")
    public String processCheckOut(@PathVariable Long bookingId, HttpSession session, RedirectAttributes redirectAttributes) {
        if (!isReceptionistOrAdmin(session)) return "redirect:/login";

        try {
            checkInService.processCheckOut(bookingId);
            redirectAttributes.addFlashAttribute("success", "Guest checked out successfully! Room marked for cleaning.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Check-out failed: " + e.getMessage());
        }
        return "redirect:/receptionist/dashboard";
    }

    @PostMapping("/room/status")
    public String updateRoomStatus(@RequestParam Long roomId, @RequestParam String status, HttpSession session, RedirectAttributes redirectAttributes) {
        if (!isReceptionistOrAdmin(session)) return "redirect:/login";

        roomService.updateRoomStatus(roomId, status);
        redirectAttributes.addFlashAttribute("success", "Room status updated to: " + status);
        return "redirect:/receptionist/dashboard";
    }

    @PostMapping("/service/status")
    public String updateServiceStatus(@RequestParam Long serviceId, @RequestParam String status, @RequestParam(required = false) String assignedStaff, HttpSession session, RedirectAttributes redirectAttributes) {
        if (!isReceptionistOrAdmin(session)) return "redirect:/login";

        serviceRequestService.updateServiceStatus(serviceId, status, assignedStaff);
        redirectAttributes.addFlashAttribute("success", "Service request status updated!");
        return "redirect:/receptionist/dashboard";
    }
}
