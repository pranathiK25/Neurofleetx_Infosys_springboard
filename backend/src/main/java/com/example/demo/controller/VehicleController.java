package com.example.demo.controller;

import com.example.demo.model.Alert;
import com.example.demo.model.Vehicle;
import com.example.demo.repository.AlertRepository;
import com.example.demo.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private AlertRepository alertRepository; // <--- DECLARED ONLY ONCE HERE

    // ➤ GET ALL VEHICLES
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // ➤ ADD VEHICLE
    @PostMapping("/add")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle, @RequestHeader(value = "Role", required = false) String role) {
        // Optional permission check logic
        if (role != null && !role.equalsIgnoreCase("MANAGER") &&
                !role.equalsIgnoreCase("FLEET MANAGER") &&
                !role.equalsIgnoreCase("ADMIN")) {
            // throw new RuntimeException("Access Denied");
        }

        if (vehicle.getStatus() == null) vehicle.setStatus("Available");

        // Ensure defaults exist for simulation
        if (vehicle.getBattery() == 0) vehicle.setBattery(100);

        return vehicleRepository.save(vehicle);
    }

    // ➤ DELETE VEHICLE
    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        vehicleRepository.deleteById(id);
    }

    // ➤ GET ALERTS
    @GetMapping("/alerts")
    public List<Alert> getRecentAlerts() {
        // This works now because we imported Alert and AlertRepository at the top
        return alertRepository.findTop5ByOrderByTimestampDesc();
    }
}