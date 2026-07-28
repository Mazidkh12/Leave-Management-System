package com.zidcode.leave_management_system.dto;

import com.zidcode.leave_management_system.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private Role role;

}