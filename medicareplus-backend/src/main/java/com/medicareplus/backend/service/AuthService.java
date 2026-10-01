package com.medicareplus.backend.service;

import com.medicareplus.backend.dto.auth.CreateUserRequest;
import com.medicareplus.backend.dto.auth.LoginRequest;
import com.medicareplus.backend.dto.auth.LoginResponse;
import com.medicareplus.backend.dto.auth.UserResponse;
import com.medicareplus.backend.entity.User;
import com.medicareplus.backend.enums.UserStatus;
import com.medicareplus.backend.exception.BadRequestException;
import com.medicareplus.backend.repository.UserRepository;
import com.medicareplus.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadRequestException("Barua pepe au nenosiri si sahihi"));

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails, Map.of(
                "role", user.getRole().name(),
                "name", user.getFullName()
        ));

        return new LoginResponse(token, UserResponse.from(user));
    }

    public UserResponse me(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Mtumiaji hakupatikana"));
        return UserResponse.from(user);
    }

    @Transactional
    public UserResponse register(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Barua pepe hii tayari imesajiliwa");
        }
        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .status(UserStatus.ACTIVE)
                .build();
        return UserResponse.from(userRepository.save(user));
    }
}
