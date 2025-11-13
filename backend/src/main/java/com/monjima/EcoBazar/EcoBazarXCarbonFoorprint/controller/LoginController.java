package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.config.JwtUtil;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.LoginRequest;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.User;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                // Fetch role from your UserRepository
                User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow();
                String token = jwtUtil.generateToken(userDetails, user.getRole().name());
                return ResponseEntity.ok(Map.of("token", token, "role", user.getRole()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Login failed: " + e.getMessage());
        }
    }

}

