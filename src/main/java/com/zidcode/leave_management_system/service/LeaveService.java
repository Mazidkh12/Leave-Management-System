package com.zidcode.leave_management_system.service;


import com.zidcode.leave_management_system.dto.LeaveRequestDto;
import com.zidcode.leave_management_system.dto.LeaveResponseDto;

import java.util.List;

public interface LeaveService {

    LeaveResponseDto applyLeave(LeaveRequestDto request);

    List<LeaveResponseDto> getMyLeaves();

    List<LeaveResponseDto> getAllLeaves();

    LeaveResponseDto approveLeave(Long id);

    LeaveResponseDto rejectLeave(Long id);

    void cancelLeave(Long id);

}