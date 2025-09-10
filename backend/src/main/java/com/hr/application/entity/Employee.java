package com.hr.application.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "employees")
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;
    
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;
    
    @Size(max = 100, message = "Division must not exceed 100 characters")
    @Column(name = "division", length = 100)
    private String division;
    
    @Size(max = 100, message = "Building must not exceed 100 characters")
    @Column(name = "building", length = 100)
    private String building;
    
    @Size(max = 100, message = "Title must not exceed 100 characters")
    @Column(name = "title", length = 100)
    private String title;
    
    @Size(max = 20, message = "Room must not exceed 20 characters")
    @Column(name = "room", length = 20)
    private String room;
    
    public Employee() {}
    
    public Employee(String firstName, String lastName, String division, 
                   String building, String title, String room) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.division = division;
        this.building = building;
        this.title = title;
        this.room = room;
    }
    
    public Long getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getDivision() {
        return division;
    }
    
    public void setDivision(String division) {
        this.division = division;
    }
    
    public String getBuilding() {
        return building;
    }
    
    public void setBuilding(String building) {
        this.building = building;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getRoom() {
        return room;
    }
    
    public void setRoom(String room) {
        this.room = room;
    }
}