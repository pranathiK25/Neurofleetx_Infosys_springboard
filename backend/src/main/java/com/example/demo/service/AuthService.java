package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo; // Your repository is named 'repo'

    @Autowired
    private JwtUtil jwt; // Your JwtUtil instance is named 'jwt'

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User signup(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public String login(String email, String password) {
        User user = repo.findByEmail(email);

        if (user != null && encoder.matches(password, user.getPassword())) {
            return jwt.generateToken(email);
        }

        throw new RuntimeException("Invalid Credentials");
    }

    public User getUserProfile(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        String email = jwt.extractEmail(token);
        return repo.findByEmail(email);
    }

    public String getUserRole(String email) {
        User user = repo.findByEmail(email);
        if (user != null) {
            return user.getRole();
        }
        return null;
    }

    // ➤ FIXED updateUser METHOD
    public User updateUser(String token, User updatedData) {
        // 1. Clean the token
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String email = jwt.extractEmail(token);

        User existingUser = repo.findByEmail(email);

        if (existingUser != null) {
            // 4. Update fields
            existingUser.setName(updatedData.getName());
            existingUser.setPhone(updatedData.getPhone());
            existingUser.setAddress(updatedData.getAddress());
            existingUser.setCity(updatedData.getCity());
            existingUser.setZip(updatedData.getZip());

            // New Profile Fields
            existingUser.setDob(updatedData.getDob());
            existingUser.setBloodGroup(updatedData.getBloodGroup());
            existingUser.setEmergencyContact(updatedData.getEmergencyContact());
            existingUser.setEmployeeId(updatedData.getEmployeeId());
            existingUser.setDepartment(updatedData.getDepartment());

            // Fleet fields
            existingUser.setLicenseNumber(updatedData.getLicenseNumber());
            existingUser.setLicenseExpiry(updatedData.getLicenseExpiry());
            existingUser.setVehicleModel(updatedData.getVehicleModel());
            existingUser.setVehiclePlate(updatedData.getVehiclePlate());
            existingUser.setVehicleYear(updatedData.getVehicleYear());

            // 5. Save using 'repo'
            return repo.save(existingUser);
        }
        return null;
    }
}