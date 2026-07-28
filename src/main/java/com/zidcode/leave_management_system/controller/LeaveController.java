package com.zidcode.leave_management_system.controller;

import com.zidcode.leave_management_system.dto.LeaveRequestDto;
import com.zidcode.leave_management_system.dto.LeaveResponseDto;
import com.zidcode.leave_management_system.service.LeaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<LeaveResponseDto> applyLeave(
            @Valid @RequestBody LeaveRequestDto request) {

        return new ResponseEntity<>(
                leaveService.applyLeave(request),
                HttpStatus.CREATED);
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<List<LeaveResponseDto>> getMyLeaves() {

        return ResponseEntity.ok(leaveService.getMyLeaves());
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<LeaveResponseDto>> getAllLeaves() {

        return ResponseEntity.ok(leaveService.getAllLeaves());
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<LeaveResponseDto> approveLeave(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveService.approveLeave(id));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<LeaveResponseDto> rejectLeave(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                leaveService.rejectLeave(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<String> cancelLeave(
            @PathVariable Long id) {

        leaveService.cancelLeave(id);

        return ResponseEntity.ok(
                "Leave request cancelled successfully.");
    }
}