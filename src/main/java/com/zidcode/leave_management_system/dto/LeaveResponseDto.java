package com.zidcode.leave_management_system.dto;

import com.zidcode.leave_management_system.entity.LeaveStatus;
import com.zidcode.leave_management_system.entity.LeaveType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class LeaveResponseDto {

    private Long id;

    private String employeeName;

    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private String reason;

    private LeaveStatus status;

    private LocalDate appliedDate;
}