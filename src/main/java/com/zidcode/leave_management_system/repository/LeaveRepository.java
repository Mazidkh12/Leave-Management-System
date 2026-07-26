package com.zidcode.leave_management_system.repository;

import com.zidcode.leave_management_system.entity.Employee;
import com.zidcode.leave_management_system.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);

}