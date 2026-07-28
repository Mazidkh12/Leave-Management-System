package com.zidcode.leave_management_system.dto;

import com.zidcode.leave_management_system.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private LocalDate joiningDate;

    private Long departmentId;

    private String departmentName;

    private Role role;
}