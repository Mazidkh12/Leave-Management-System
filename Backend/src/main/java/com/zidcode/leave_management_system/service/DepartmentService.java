package com.zidcode.leave_management_system.service;


import com.zidcode.leave_management_system.dto.DepartmentRequest;
import com.zidcode.leave_management_system.dto.DepartmentResponse;

import java.util.List;

public interface DepartmentService {

    DepartmentResponse createDepartment(DepartmentRequest request);

    List<DepartmentResponse> getAllDepartments();

    DepartmentResponse getDepartmentById(Long id);

    DepartmentResponse updateDepartment(Long id,
                                        DepartmentRequest request);

    void deleteDepartment(Long id);

}