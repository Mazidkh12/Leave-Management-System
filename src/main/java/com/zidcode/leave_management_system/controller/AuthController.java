package com.zidcode.leave_management_system.controller;

import com.zidcode.leave_management_system.dto.AuthResponse;
import com.zidcode.leave_management_system.dto.LoginRequest;
import com.zidcode.leave_management_system.dto.RegisterRequest;
import com.zidcode.leave_management_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request){

        authService.register(request);

        return ResponseEntity.ok("User Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request){

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}