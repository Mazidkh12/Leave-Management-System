package com.zidcode.leave_management_system.service;


import com.zidcode.leave_management_system.dto.EmployeeRequest;
import com.zidcode.leave_management_system.dto.EmployeeResponse;
import com.zidcode.leave_management_system.dto.EmployeeUpdateRequest;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeUpdateRequest request);

    void deleteEmployee(Long id);
}