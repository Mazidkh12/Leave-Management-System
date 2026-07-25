package com.zidcode.leave_management_system.repository;

import com.zidcode.leave_management_system.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

}