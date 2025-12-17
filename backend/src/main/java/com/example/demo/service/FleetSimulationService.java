package com.example.demo.service;

import com.example.demo.model.Alert;
import com.example.demo.model.Vehicle;
import com.example.demo.repository.AlertRepository;
import com.example.demo.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class FleetSimulationService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private AlertRepository alertRepository;

    private final Random random = new Random();

    // Runs every 3 seconds
    @Scheduled(fixedRate = 3000)
//    public void simulate() {
//        List<Vehicle> list = vehicleRepository.findAll();
//
//        for (Vehicle v : list) {
//
//            // --- LOGIC 1: IF VEHICLE IS "ACTIVE" (IN USE) ---
//            if ("Active".equalsIgnoreCase(v.getStatus())) {
//
//                // A. Random Speed (0 - 120 km/h)
//                int speed = random.nextInt(121); // Generates 0 to 120
//                v.setSpeed(speed);
//
//                // B. Check Overspeeding (> 100 km/h)
//                if (speed > 100) {
//                    createAlert("Overspeeding: " + v.getName() + " is at " + speed + " km/h!", "warning");
//                }
//
//                // C. Drain Battery (1-2%)
//                double drain = 1 + random.nextInt(2); // 1 or 2
//                v.setBattery(Math.max(0, v.getBattery() - drain));
//
//                // D. Update Distance (Simulate distance added per 3s tick)
//                // (Speed km/h) / 1200 is roughly distance in 3 seconds
//                double distanceAdded = speed / 1200.0;
//                v.setDistance(v.getDistance() + distanceAdded);
//
//                // --- LOGIC 3: ENGINE HEALTH (MAINTENANCE > 1000km) ---
//                if (v.getDistance() > 1000) {
//                    v.setStatus("Maintenance");
//                    v.setSpeed(0);
//                    createAlert("Engine Check: " + v.getName() + " exceeded 1000km. Sent for service.", "info");
//                }
//
//                // E. Check Dead Battery
//                if (v.getBattery() <= 0) {
//                    v.setStatus("Maintenance");
//                    v.setSpeed(0);
//                    createAlert("Critical: " + v.getName() + " battery dead!", "error");
//                }
//
//            }
//            // --- LOGIC 2: IF VEHICLE IS "IDLE" ---
//            else if ("Idle".equalsIgnoreCase(v.getStatus())) {
//                v.setSpeed(0);
//
//                // Drain very slowly (0.1%)
//                v.setBattery(Math.max(0, v.getBattery() - 0.1));
//
//                if (v.getBattery() <= 0) {
//                    v.setStatus("Maintenance");
//                    createAlert("Critical: " + v.getName() + " battery drained while idle.", "error");
//                }
//            }
//        }
//
//        // Save everything to database
//        vehicleRepository.saveAll(list);
//        System.out.println("Simulation Tick: Updated " + list.size() + " vehicles.");
//    }
    @Scheduled(fixedRate = 3000)
    public void simulate() {
        List<Vehicle> list = vehicleRepository.findAll();

        for (Vehicle v : list) {

            // Only update active vehicles
            if ("Active".equalsIgnoreCase(v.getStatus())) {

                // 1. Random Speed Logic
                int speed = random.nextInt(121); // 0 to 120 km/h
                v.setSpeed(speed);

                // 2. Overspeeding Alert
                if (speed > 100) {
                    createAlert("Overspeeding: " + v.getName() + " is at " + speed + " km/h!", "warning");
                }

                // 3. Battery Drain Logic
                v.setBattery(Math.max(0, v.getBattery() - 1));

                // ➤ 4. ENGINE HEALTH (WEAR & TEAR) LOGIC
                // Calculate distance covered in these 3 seconds
                // Formula: km/h divided by 1200 = km traveled in 3 sec
                double distanceAdded = speed / 1200.0;
                v.setDistance(v.getDistance() + distanceAdded);

                // CHECK: Has it exceeded 1,000 simulated km?
                if (v.getDistance() >= 1000) {
                    v.setStatus("Maintenance");  // Trigger Status Change
                    v.setSpeed(0);               // Stop the car

                    // Trigger Alert
                    createAlert("Engine Check: " + v.getName() + " reached 1000km. Needs Service.", "info");

                    // Optional: Reset distance if you want them to 'repair' immediately
                    // v.setDistance(0);
                }

                // 5. Dead Battery Check
                if (v.getBattery() <= 0) {
                    v.setStatus("Maintenance");
                    v.setSpeed(0);
                    createAlert("Critical: " + v.getName() + " battery died!", "error");
                }

            } else if ("Maintenance".equalsIgnoreCase(v.getStatus())) {
                // Optional: Simulate repair over time
                v.setSpeed(0);
            }
        }

        vehicleRepository.saveAll(list);
    }

    // Helper to create alerts
    private void createAlert(String msg, String type) {
        Alert alert = new Alert();
        alert.setMessage(msg);
        alert.setType(type);
        alert.setTimestamp(LocalDateTime.now());
        alertRepository.save(alert);
    }
}