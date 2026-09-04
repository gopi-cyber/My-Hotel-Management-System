package com.hotel.management.config;

import com.hotel.management.model.*;
import com.hotel.management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final StaffRepository staffRepository;
    private final BookingRepository bookingRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    @Autowired
    public DataInitializer(UserRepository userRepository, RoomRepository roomRepository,
                           StaffRepository staffRepository, BookingRepository bookingRepository,
                           ServiceRequestRepository serviceRequestRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.staffRepository = staffRepository;
        this.bookingRepository = bookingRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    @Override
    public void run(String... args) {
        // Initialize Default Users
        if (userRepository.count() == 0) {
            User admin = new User("admin", "123", "Administrator", "admin@luxestay.com", "+1 555-0100", Role.ADMIN);
            User staffUser = new User("staff", "123", "Front Desk Staff", "staff@luxestay.com", "+1 555-0101", Role.RECEPTIONIST);
            User guestUser = new User("new_guest", "123", "Alex Morgan", "alex@example.com", "+1 555-0199", Role.GUEST);

            userRepository.save(admin);
            userRepository.save(staffUser);
            userRepository.save(guestUser);
            System.out.println("✅ Seeded default users (admin, staff, new_guest).");
        }

        // Initialize Default Rooms
        if (roomRepository.count() == 0) {
            roomRepository.save(new Room(
                    "101",
                    "Deluxe Ocean Suite",
                    "Deluxe Suite",
                    new BigDecimal("250.00"),
                    2,
                    "available",
                    "Stunning ocean view with king-size bed and marble bath.",
                    "WiFi, Ocean View, King Bed, Mini Bar, Smart TV, AC",
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
            ));

            roomRepository.save(new Room(
                    "102",
                    "Executive King Room",
                    "Executive",
                    new BigDecimal("180.00"),
                    2,
                    "available",
                    "Spacious executive room ideal for business travelers with dedicated workspace.",
                    "WiFi, Workspace, King Bed, City View, Coffee Maker",
                    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800"
            ));

            roomRepository.save(new Room(
                    "103",
                    "Presidential Penthouse",
                    "Penthouse",
                    new BigDecimal("500.00"),
                    4,
                    "available",
                    "Top-floor luxury penthouse with panoramic city views and private jacuzzi.",
                    "WiFi, Jacuzzi, Private Terrace, 2 King Beds, Butler Service",
                    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
            ));

            roomRepository.save(new Room(
                    "201",
                    "Standard Double Room",
                    "Standard",
                    new BigDecimal("120.00"),
                    2,
                    "available",
                    "Comfortable and cozy double room with all modern essentials.",
                    "WiFi, Queen Bed, AC, En-suite Bathroom",
                    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800"
            ));

            roomRepository.save(new Room(
                    "202",
                    "Family Garden Suite",
                    "Family Suite",
                    new BigDecimal("290.00"),
                    4,
                    "available",
                    "Spacious suite overlooking lush gardens, perfect for families.",
                    "WiFi, Garden View, 2 Queen Beds, Kitchenette, Bathtub",
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800"
            ));
            System.out.println("✅ Seeded default hotel rooms.");
        }

        // Initialize Default Staff
        if (staffRepository.count() == 0) {
            staffRepository.save(new Staff("Elena Rostova", "elena@luxestay.com", "+1 555-0201", "Front Desk Lead", "Reception", "Morning", new BigDecimal("4200.00"), "Active", LocalDate.of(2024, 1, 15)));
            staffRepository.save(new Staff("Marcus Vance", "marcus@luxestay.com", "+1 555-0202", "Executive Chef", "Kitchen", "Evening", new BigDecimal("5500.00"), "Active", LocalDate.of(2023, 6, 10)));
            staffRepository.save(new Staff("Sarah Jenkins", "sarah@luxestay.com", "+1 555-0203", "Head Housekeeper", "Housekeeping", "Morning", new BigDecimal("3800.00"), "Active", LocalDate.of(2024, 3, 1)));
            staffRepository.save(new Staff("David Chen", "david@luxestay.com", "+1 555-0204", "Maintenance Tech", "Maintenance", "Night", new BigDecimal("3900.00"), "Active", LocalDate.of(2024, 2, 20)));
            System.out.println("✅ Seeded default staff members.");
        }

        // Initialize Default Booking
        if (bookingRepository.count() == 0) {
            User guest = userRepository.findByUsername("new_guest").orElse(null);
            Room room = roomRepository.findByRoomNumber("101").orElse(null);
            if (guest != null && room != null) {
                Booking booking = new Booking();
                booking.setBookingReference("BK-1001");
                booking.setUser(guest);
                booking.setGuestName(guest.getName());
                booking.setGuestEmail(guest.getEmail());
                booking.setGuestPhone(guest.getPhone());
                booking.setRoom(room);
                booking.setRoomNumber(room.getRoomNumber());
                booking.setRoomType(room.getType());
                booking.setCheckInDate(LocalDate.now());
                booking.setCheckOutDate(LocalDate.now().plusDays(3));
                booking.setNights(3);
                booking.setGuestsCount(2);
                booking.setTotalAmount(new BigDecimal("750.00"));
                booking.setStatus("CONFIRMED");
                booking.setPaymentStatus("PAID");
                booking.setSpecialRequests("Late check-in around 8 PM, extra towels requested.");
                bookingRepository.save(booking);
                System.out.println("✅ Seeded initial booking record.");
            }
        }

        // Initialize Default Service Request
        if (serviceRequestRepository.count() == 0) {
            User guest = userRepository.findByUsername("new_guest").orElse(null);
            if (guest != null) {
                ServiceRequest request = new ServiceRequest(
                        guest,
                        guest.getName(),
                        "101",
                        "Housekeeping",
                        "Fresh towels and extra pillows requested.",
                        "MEDIUM",
                        "PENDING",
                        "Sarah Jenkins"
                );
                serviceRequestRepository.save(request);
                System.out.println("✅ Seeded initial service request.");
            }
        }
    }
}
