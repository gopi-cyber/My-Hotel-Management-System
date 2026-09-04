package com.hotel.management.controller.api;

import com.hotel.management.model.ServiceRequest;
import com.hotel.management.service.HotelServiceRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
@Tag(name = "Services API", description = "Hotel guest service requests operations")
public class ServiceApiController {

    private final HotelServiceRequestService serviceRequestService;

    @Autowired
    public ServiceApiController(HotelServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @GetMapping
    @Operation(summary = "Get all service requests or filter by userId")
    public ResponseEntity<List<ServiceRequest>> getServices(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return ResponseEntity.ok(serviceRequestService.getServicesByUserId(userId));
        }
        return ResponseEntity.ok(serviceRequestService.getAllServices());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get service request by ID")
    public ResponseEntity<ServiceRequest> getServiceById(@PathVariable Long id) {
        return serviceRequestService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Create a new service request")
    public ResponseEntity<ServiceRequest> createService(
            @RequestParam(required = false) Long userId,
            @Valid @RequestBody ServiceRequest request) {
        ServiceRequest created = serviceRequestService.createServiceRequest(userId, request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update service request status")
    public ResponseEntity<ServiceRequest> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        String assignedStaff = payload.get("assignedStaff");
        return ResponseEntity.ok(serviceRequestService.updateServiceStatus(id, status, assignedStaff));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete service request")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceRequestService.deleteServiceRequest(id);
        return ResponseEntity.noContent().build();
    }
}
