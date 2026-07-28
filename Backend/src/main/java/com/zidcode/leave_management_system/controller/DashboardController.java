package com.zidcode.leave_management_system.controller;

import com.zidcode.leave_management_system.dto.DashboardResponseDto;
import com.zidcode.leave_management_system.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'EMPLOYEE')")
    public DashboardResponseDto getDashboardSummary() {

        return dashboardService.getDashboardSummary();

    }
}