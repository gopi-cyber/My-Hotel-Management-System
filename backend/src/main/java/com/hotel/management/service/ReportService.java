package com.hotel.management.service;

import com.hotel.management.repository.BookingRepository;
import com.hotel.management.repository.RoomRepository;
import com.hotel.management.repository.ServiceRequestRepository;
import com.hotel.management.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class ReportService {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final StaffRepository staffRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    @Autowired
    public ReportService(RoomRepository roomRepository, BookingRepository bookingRepository, StaffRepository staffRepository, ServiceRequestRepository serviceRequestRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
        this.staffRepository = staffRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public Map<String, Object> getHotelSummaryStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.countByStatus("available");
        long occupiedRooms = roomRepository.countByStatus("occupied");
        long cleaningRooms = roomRepository.countByStatus("cleaning");
        long totalBookings = bookingRepository.count();
        long activeCheckIns = bookingRepository.countCheckedInBookings();
        long totalStaff = staffRepository.count();
        long pendingServices = serviceRequestRepository.countByStatus("PENDING");
        BigDecimal totalRevenue = bookingRepository.calculateTotalRevenue();

        stats.put("totalRooms", totalRooms);
        stats.put("availableRooms", availableRooms);
        stats.put("occupiedRooms", occupiedRooms);
        stats.put("cleaningRooms", cleaningRooms);
        stats.put("totalBookings", totalBookings);
        stats.put("activeCheckIns", activeCheckIns);
        stats.put("totalStaff", totalStaff);
        stats.put("pendingServices", pendingServices);
        stats.put("totalRevenue", totalRevenue != null ? totalRevenue : BigDecimal.ZERO);

        double occupancyRate = totalRooms > 0 ? ((double) occupiedRooms / totalRooms) * 100.0 : 0.0;
        stats.put("occupancyRate", String.format("%.1f%%", occupancyRate));

        return stats;
    }
}
