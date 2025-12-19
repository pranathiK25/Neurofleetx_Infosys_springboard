package com.example.demo.controller;

import com.example.demo.model.Alert;
import com.example.demo.model.Vehicle;
import com.example.demo.repository.AlertRepository;
import com.example.demo.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle details) {
        return vehicleRepository.findById(id).map(vehicle -> {
            vehicle.setName(details.getName());
            vehicle.setPlate(details.getPlate());
            vehicle.setStatus(details.getStatus());
            vehicle.setLocation(details.getLocation());
            // We typically don't update speed/battery manually in PUT,
            // as the simulation handles that.
            return ResponseEntity.ok(vehicleRepository.save(vehicle));
        }).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/available/all")
    public List<Vehicle> getAvailableVehicles() {
        // Assuming "Active" or "Idle" means available, and "Maintenance" is not
        return vehicleRepository.findAll().stream()
                .filter(v -> !"Maintenance".equalsIgnoreCase(v.getStatus()))
                .toList();
    }
}