package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.SignUpRequest;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Role;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.User;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class SignUpController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User user = new User();
        user.setFirstname(signUpRequest.getFirstname());
        user.setLastname(signUpRequest.getLastname());
        user.setEmail(signUpRequest.getEmail());
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRole(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.USER);

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
}
