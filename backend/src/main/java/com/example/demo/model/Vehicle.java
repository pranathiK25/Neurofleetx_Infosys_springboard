package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String plate;
    private String status;
    private String location;

    // ➤ ADD THESE NEW FIELDS
    private double battery;
    private int speed;
    private double distance;

    // ➤ AND GENERATE GETTERS AND SETTERS FOR THEM
    // (You can use your IDE to generate these: Right Click -> Generate -> Getters and Setters)



    public double getBattery() { return battery; }
    public void setBattery(double battery) { this.battery = battery; }

    public int getSpeed() { return speed; }
    public void setSpeed(int speed) { this.speed = speed; }

    public double getDistance() { return distance; }
    public void setDistance(double distance) { this.distance = distance; }

    // ... Keep your existing Getters/Setters for id, name, plate, etc.
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}