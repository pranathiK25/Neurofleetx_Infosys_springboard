package com.example.demo.controller;


import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return service.signup(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {
        return service.login(req.getEmail(), req.getPassword());
    }


    @GetMapping("/profile")
    public User getProfile(@RequestHeader("Authorization") String token) {
        return service.getUserProfile(token);
    }



    @PostMapping("/check-role")
    public String checkRole(@RequestBody LoginRequest req) {
        return service.getUserRole(req.getEmail());
    }
    @PostMapping("/profile")
    public User updateProfile(@RequestHeader("Authorization") String token, @RequestBody User user) {
        return service.updateUser(token, user);
    }
}


class LoginRequest {
    private String email;
    private String password;

    public String getEmail() { return email; }
    public String getPassword() { return password; }

    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
}