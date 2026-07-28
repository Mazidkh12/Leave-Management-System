package com.zidcode.leave_management_system.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponseDto {

    private Long totalEmployees;
    private Long totalDepartments;
    private Long totalLeaves;

    private Long pendingLeaves;
    private Long approvedLeaves;
    private Long rejectedLeaves;
}