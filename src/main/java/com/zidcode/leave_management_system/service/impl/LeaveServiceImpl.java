package com.zidcode.leave_management_system.service.impl;


import com.zidcode.leave_management_system.dto.LeaveRequestDto;
import com.zidcode.leave_management_system.dto.LeaveResponseDto;
import com.zidcode.leave_management_system.entity.Employee;
import com.zidcode.leave_management_system.entity.LeaveRequest;
import com.zidcode.leave_management_system.entity.LeaveStatus;
import com.zidcode.leave_management_system.exception.ResourceNotFoundException;
import com.zidcode.leave_management_system.repository.EmployeeRepository;
import com.zidcode.leave_management_system.repository.LeaveRepository;
import com.zidcode.leave_management_system.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveResponseDto applyLeave(LeaveRequestDto request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        LeaveRequest leave = LeaveRequest.builder()
                .leaveType(request.getLeaveType())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reason(request.getReason())
                .status(LeaveStatus.PENDING)
                .appliedDate(LocalDate.now())
                .employee(employee)
                .build();

        LeaveRequest savedLeave = leaveRepository.save(leave);

        return mapToResponse(savedLeave);
    }

    @Override
    public List<LeaveResponseDto> getMyLeaves() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found"));

        return leaveRepository.findByEmployee(employee)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<LeaveResponseDto> getAllLeaves() {

        return leaveRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public LeaveResponseDto approveLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Leave not found"));

        leave.setStatus(LeaveStatus.APPROVED);

        return mapToResponse(leaveRepository.save(leave));
    }

    @Override
    public LeaveResponseDto rejectLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Leave not found"));

        leave.setStatus(LeaveStatus.REJECTED);

        return mapToResponse(leaveRepository.save(leave));
    }

    @Override
    public void cancelLeave(Long id) {

        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Leave not found"));

        if (leave.getStatus() != LeaveStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Only pending leave requests can be cancelled.");
        }

        leaveRepository.delete(leave);
    }

    private LeaveResponseDto mapToResponse(LeaveRequest leave) {

        return LeaveResponseDto.builder()
                .id(leave.getId())
                .employeeName(
                        leave.getEmployee().getFirstName()
                                + " "
                                + leave.getEmployee().getLastName())
                .leaveType(leave.getLeaveType())
                .startDate(leave.getStartDate())
                .endDate(leave.getEndDate())
                .reason(leave.getReason())
                .status(leave.getStatus())
                .appliedDate(leave.getAppliedDate())
                .build();
    }
}