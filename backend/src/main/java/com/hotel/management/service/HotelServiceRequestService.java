package com.hotel.management.service;

import com.hotel.management.model.ServiceRequest;
import com.hotel.management.model.User;
import com.hotel.management.repository.ServiceRequestRepository;
import com.hotel.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HotelServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;

    @Autowired
    public HotelServiceRequestService(ServiceRequestRepository serviceRequestRepository, UserRepository userRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.userRepository = userRepository;
    }

    public List<ServiceRequest> getAllServices() {
        return serviceRequestRepository.findAll();
    }

    public Optional<ServiceRequest> getServiceById(Long id) {
        return serviceRequestRepository.findById(id);
    }

    public List<ServiceRequest> getServicesByUserId(Long userId) {
        return serviceRequestRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public ServiceRequest createServiceRequest(Long userId, ServiceRequest request) {
        if (userId != null) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                request.setUser(user);
                request.setGuestName(user.getName());
            }
        }
        if (request.getStatus() == null) {
            request.setStatus("PENDING");
        }
        return serviceRequestRepository.save(request);
    }

    public ServiceRequest updateServiceStatus(Long id, String status, String assignedStaff) {
        ServiceRequest request = serviceRequestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service request not found with id: " + id));

        request.setStatus(status);
        if (assignedStaff != null && !assignedStaff.isBlank()) {
            request.setAssignedStaff(assignedStaff);
        }
        return serviceRequestRepository.save(request);
    }

    public void deleteServiceRequest(Long id) {
        serviceRequestRepository.deleteById(id);
    }
}
