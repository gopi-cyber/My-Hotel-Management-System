package com.hotel.management.controller.api;

import com.hotel.management.model.CheckInRecord;
import com.hotel.management.service.CheckInService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/checkin")
@Tag(name = "Check-In API", description = "Hotel front desk check-in/out logs and operations")
public class CheckInApiController {

    private final CheckInService checkInService;

    @Autowired
    public CheckInApiController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @GetMapping
    @Operation(summary = "Get all check-in records")
    public ResponseEntity<List<CheckInRecord>> getAllCheckIns() {
        return ResponseEntity.ok(checkInService.getAllCheckIns());
    }

    @PostMapping("/process")
    @Operation(summary = "Process guest check-in")
    public ResponseEntity<CheckInRecord> processCheckIn(@RequestBody Map<String, String> payload) {
        Long bookingId = Long.parseLong(payload.get("bookingId"));
        String idProofType = payload.get("idProofType");
        String idProofNumber = payload.get("idProofNumber");
        String staffInCharge = payload.get("staffInCharge");
        String notes = payload.get("notes");

        CheckInRecord record = checkInService.processCheckIn(bookingId, idProofType, idProofNumber, staffInCharge, notes);
        return new ResponseEntity<>(record, HttpStatus.CREATED);
    }

    @PostMapping("/checkout/{bookingId}")
    @Operation(summary = "Process guest check-out")
    public ResponseEntity<CheckInRecord> processCheckOut(@PathVariable Long bookingId) {
        CheckInRecord record = checkInService.processCheckOut(bookingId);
        return ResponseEntity.ok(record);
    }
}
