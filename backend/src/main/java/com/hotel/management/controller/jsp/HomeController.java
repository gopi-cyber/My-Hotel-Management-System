package com.hotel.management.controller.jsp;

import com.hotel.management.model.Role;
import com.hotel.management.model.User;
import com.hotel.management.service.RoomService;
import com.hotel.management.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class HomeController {

    private final UserService userService;
    private final RoomService roomService;

    @Autowired
    public HomeController(UserService userService, RoomService roomService) {
        this.userService = userService;
        this.roomService = roomService;
    }

    @GetMapping("/")
    public String index(Model model, HttpSession session) {
        model.addAttribute("featuredRooms", roomService.getAvailableRooms());
        return "index";
    }

    @GetMapping("/login")
    public String loginPage(HttpSession session) {
        if (session.getAttribute("currentUser") != null) {
            User user = (User) session.getAttribute("currentUser");
            if (user.getRole() == Role.ADMIN) return "redirect:/admin/dashboard";
            if (user.getRole() == Role.RECEPTIONIST) return "redirect:/receptionist/dashboard";
            return "redirect:/guest/dashboard";
        }
        return "auth/login";
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String username,
                               @RequestParam String password,
                               HttpSession session,
                               RedirectAttributes redirectAttributes) {
        Optional<User> userOpt = userService.authenticate(username, password);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            session.setAttribute("currentUser", user);
            session.setAttribute("userId", user.getId());
            session.setAttribute("userName", user.getName());
            session.setAttribute("userRole", user.getRole().name());

            if (user.getRole() == Role.ADMIN) {
                return "redirect:/admin/dashboard";
            } else if (user.getRole() == Role.RECEPTIONIST) {
                return "redirect:/receptionist/dashboard";
            } else {
                return "redirect:/guest/dashboard";
            }
        }

        redirectAttributes.addFlashAttribute("error", "Invalid username or password");
        return "redirect:/login";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "auth/register";
    }

    @PostMapping("/register")
    public String processRegister(@RequestParam String username,
                                  @RequestParam String password,
                                  @RequestParam String name,
                                  @RequestParam String email,
                                  @RequestParam(required = false) String phone,
                                  RedirectAttributes redirectAttributes) {
        try {
            User newUser = new User(username, password, name, email, phone, Role.GUEST);
            userService.registerUser(newUser);
            redirectAttributes.addFlashAttribute("success", "Registration successful! Please sign in.");
            return "redirect:/login";
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
            return "redirect:/register";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session, RedirectAttributes redirectAttributes) {
        session.invalidate();
        redirectAttributes.addFlashAttribute("success", "You have been logged out successfully.");
        return "redirect:/login";
    }
}
