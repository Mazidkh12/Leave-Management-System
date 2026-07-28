package com.zidcode.leave_management_system.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DepartmentRequest {

    @NotBlank(message = "Department name cannot be empty")
    @Size(min = 2, max = 50,
            message = "Department name must be between 2 and 50 characters")
    private String departmentName;

}