package com.hotel.management.controller.jsp;

import com.hotel.management.model.Role;
import com.hotel.management.model.Room;
import com.hotel.management.model.Staff;
import com.hotel.management.model.User;
import com.hotel.management.service.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;
import java.time.LocalDate;

@Controller
@RequestMapping("/admin")
public class AdminJspController {

    private final RoomService roomService;
    private final StaffService staffService;
    private final BookingService bookingService;
    private final UserService userService;
    private final ReportService reportService;

    @Autowired
    public AdminJspController(RoomService roomService, StaffService staffService,
                              BookingService bookingService, UserService userService,
                              ReportService reportService) {
        this.roomService = roomService;
        this.staffService = staffService;
        this.bookingService = bookingService;
        this.userService = userService;
        this.reportService = reportService;
    }

    private boolean isAdmin(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        return user != null && user.getRole() == Role.ADMIN;
    }

    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {
        if (!isAdmin(session)) return "redirect:/login";

        model.addAttribute("stats", reportService.getHotelSummaryStats());
        model.addAttribute("rooms", roomService.getAllRooms());
        model.addAttribute("staffList", staffService.getAllStaff());
        model.addAttribute("bookings", bookingService.getAllBookings());
        model.addAttribute("users", userService.getAllUsers());
        return "admin/dashboard";
    }

    @PostMapping("/rooms/add")
    public String addRoom(
            @RequestParam String roomNumber,
            @RequestParam String name,
            @RequestParam String type,
            @RequestParam BigDecimal pricePerNight,
            @RequestParam Integer capacity,
            @RequestParam(defaultValue = "available") String status,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String amenities,
            @RequestParam(required = false) String imageUrl,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        if (!isAdmin(session)) return "redirect:/login";

        try {
            Room room = new Room(roomNumber, name, type, pricePerNight, capacity, status, description, amenities, imageUrl);
            roomService.saveRoom(room);
            redirectAttributes.addFlashAttribute("success", "Room " + roomNumber + " added successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error adding room: " + e.getMessage());
        }
        return "redirect:/admin/dashboard";
    }

    @PostMapping("/rooms/delete/{id}")
    public String deleteRoom(@PathVariable Long id, HttpSession session, RedirectAttributes redirectAttributes) {
        if (!isAdmin(session)) return "redirect:/login";

        try {
            roomService.deleteRoom(id);
            redirectAttributes.addFlashAttribute("success", "Room deleted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error deleting room: " + e.getMessage());
        }
        return "redirect:/admin/dashboard";
    }

    @PostMapping("/staff/add")
    public String addStaff(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String role,
            @RequestParam String department,
            @RequestParam(defaultValue = "Morning") String shift,
            @RequestParam BigDecimal salary,
            @RequestParam(defaultValue = "Active") String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hireDate,
            HttpSession session,
            RedirectAttributes redirectAttributes) {

        if (!isAdmin(session)) return "redirect:/login";

        try {
            Staff staff = new Staff(name, email, phone, role, department, shift, salary, status, hireDate);
            staffService.saveStaff(staff);
            redirectAttributes.addFlashAttribute("success", "Staff member " + name + " added successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error adding staff: " + e.getMessage());
        }
        return "redirect:/admin/dashboard";
    }

    @PostMapping("/staff/delete/{id}")
    public String deleteStaff(@PathVariable Long id, HttpSession session, RedirectAttributes redirectAttributes) {
        if (!isAdmin(session)) return "redirect:/login";

        try {
            staffService.deleteStaff(id);
            redirectAttributes.addFlashAttribute("success", "Staff member deleted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error deleting staff: " + e.getMessage());
        }
        return "redirect:/admin/dashboard";
    }
}
