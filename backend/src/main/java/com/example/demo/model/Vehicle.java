package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;      // e.g., "Tesla Model 3"
    private String plate;      // e.g., "KA-05-1234"
    private String status;     // "Available", "In Use", "Maintenance"

    // Telemetry Data
    private int batteryLevel;  // 0 to 100
    private int speed;         // km/h
    private double latitude;   // GPS Lat
    private double longitude;  // GPS Lng

    public Vehicle() {}

    public Vehicle(String model, String plate, String status, int batteryLevel) {
        this.model = model;
        this.plate = plate;
        this.status = status;
        this.batteryLevel = batteryLevel;
        this.speed = 0; // Default stopped
    }

    // --- GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public int getBatteryLevel() { return batteryLevel; }
    public void setBatteryLevel(int batteryLevel) { this.batteryLevel = batteryLevel; }
    public int getSpeed() { return speed; }
    public void setSpeed(int speed) { this.speed = speed; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}