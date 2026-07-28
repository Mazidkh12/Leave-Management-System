package com.zidcode.leave_management_system.service.impl;

import com.zidcode.leave_management_system.dto.DepartmentRequest;
import com.zidcode.leave_management_system.dto.DepartmentResponse;
import com.zidcode.leave_management_system.entity.Department;
import com.zidcode.leave_management_system.exception.ResourceNotFoundException;
import com.zidcode.leave_management_system.repository.DepartmentRepository;
import com.zidcode.leave_management_system.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public DepartmentResponse createDepartment(DepartmentRequest request) {

        Department department = Department.builder()
                .departmentName(request.getDepartmentName())
                .build();

        if (departmentRepository
                .findByDepartmentName(request.getDepartmentName())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Department already exists.");
        }

        Department savedDepartment =
                departmentRepository.save(department);

        return mapToResponse(savedDepartment);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id: " + id));

        return mapToResponse(department);
    }

    @Override
    public DepartmentResponse updateDepartment(Long id,
                                               DepartmentRequest request) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id: " + id));

        department.setDepartmentName(request.getDepartmentName());

        Department updatedDepartment =
                departmentRepository.save(department);

        return mapToResponse(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found with id: " + id));

        departmentRepository.delete(department);
    }

    private DepartmentResponse mapToResponse(Department department) {

        return DepartmentResponse.builder()
                .id(department.getId())
                .departmentName(department.getDepartmentName())
                .build();
    }
}