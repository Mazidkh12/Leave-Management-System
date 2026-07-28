package com.zidcode.leave_management_system.service.impl;

import com.zidcode.leave_management_system.dto.DashboardResponseDto;
import com.zidcode.leave_management_system.entity.LeaveStatus;
import com.zidcode.leave_management_system.repository.DepartmentRepository;
import com.zidcode.leave_management_system.repository.EmployeeRepository;
import com.zidcode.leave_management_system.repository.LeaveRepository;
import com.zidcode.leave_management_system.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final LeaveRepository leaveRepository;

    @Override
    public DashboardResponseDto getDashboardSummary() {

        return DashboardResponseDto.builder()
                .totalEmployees(employeeRepository.count())
                .totalDepartments(departmentRepository.count())
                .totalLeaves(leaveRepository.count())
                .pendingLeaves(
                        leaveRepository.countByStatus(LeaveStatus.PENDING)
                )
                .approvedLeaves(
                        leaveRepository.countByStatus(LeaveStatus.APPROVED)
                )
                .rejectedLeaves(
                        leaveRepository.countByStatus(LeaveStatus.REJECTED)
                )
                .build();
    }
}