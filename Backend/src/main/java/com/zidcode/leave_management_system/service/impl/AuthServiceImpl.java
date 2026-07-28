package com.zidcode.leave_management_system.service.impl;

import com.zidcode.leave_management_system.dto.AuthResponse;
import com.zidcode.leave_management_system.dto.LoginRequest;
import com.zidcode.leave_management_system.dto.RegisterRequest;
import com.zidcode.leave_management_system.entity.Employee;
import com.zidcode.leave_management_system.entity.Role;
import com.zidcode.leave_management_system.exception.EmailAlreadyExistsException;
import com.zidcode.leave_management_system.exception.ResourceNotFoundException;
import com.zidcode.leave_management_system.repository.EmployeeRepository;
import com.zidcode.leave_management_system.security.JwtService;
import com.zidcode.leave_management_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public void register(RegisterRequest request) {

        // Check if email already exists
        if (employeeRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        Employee employee = Employee.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .joiningDate(LocalDate.now())
                .role(Role.EMPLOYEE)
                .build();

        employeeRepository.save(employee);
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid Email"));

        if (!passwordEncoder.matches(request.getPassword(), employee.getPassword())) {
            throw new ResourceNotFoundException("Invalid Password");
        }

        String token = jwtService.generateToken(employee.getEmail());

        return new AuthResponse(
                token,
                employee.getRole()
        );
    }
}