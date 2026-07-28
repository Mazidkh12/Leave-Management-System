package com.zidcode.leave_management_system.service;


import com.zidcode.leave_management_system.dto.AuthResponse;
import com.zidcode.leave_management_system.dto.LoginRequest;
import com.zidcode.leave_management_system.dto.RegisterRequest;

public interface AuthService {

    void register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}