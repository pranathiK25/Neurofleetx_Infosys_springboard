package com.example.demo.controller;

import com.example.demo.model.Vehicle;
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

    // ➤ GET ALL VEHICLES (Open to all authenticated users)
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // ➤ ADD VEHICLE (Fixed to allow FLEET MANAGER)
    @PostMapping("/add")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle, @RequestHeader("Role") String role) {
        // Allow MANAGER, FLEET MANAGER, or ADMIN
        if (!"MANAGER".equalsIgnoreCase(role) &&
                !"FLEET MANAGER".equalsIgnoreCase(role) &&
                !"ADMIN".equalsIgnoreCase(role)) {

            throw new RuntimeException("Access Denied: You do not have permission to add vehicles.");
        }

        // Set defaults
        if (vehicle.getStatus() == null) vehicle.setStatus("Available");
        vehicle.setSpeed(0);
        return vehicleRepository.save(vehicle);
    }

    // ➤ DELETE VEHICLE (Fixed to match Add permissions)
    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id, @RequestHeader("Role") String role) {
        if (!"MANAGER".equalsIgnoreCase(role) &&
                !"FLEET MANAGER".equalsIgnoreCase(role) &&
                !"ADMIN".equalsIgnoreCase(role)) {

            throw new RuntimeException("Access Denied: You do not have permission to delete vehicles.");
        }
        vehicleRepository.deleteById(id);
    }
}