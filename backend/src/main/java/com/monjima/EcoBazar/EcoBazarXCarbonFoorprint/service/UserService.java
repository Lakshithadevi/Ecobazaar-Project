package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.User;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String signup(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return "Username already exists!";
        }
        userRepository.save(user);
        return "Signup successful!";
    }

    public String login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful! Role: " + user.get().getRole();
        } else {
            return "Invalid username or password!";
        }
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


}
