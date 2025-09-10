package com.hr.application.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

@JacksonXmlRootElement(localName = "employee")
public class EmployeeXmlDto {
    
    @JacksonXmlProperty(localName = "employeeId")
    private Long employeeId;
    
    @JacksonXmlProperty(localName = "firstName")
    private String firstName;
    
    @JacksonXmlProperty(localName = "lastName")
    private String lastName;
    
    @JacksonXmlProperty(localName = "division")
    private String division;
    
    @JacksonXmlProperty(localName = "building")
    private String building;
    
    @JacksonXmlProperty(localName = "title")
    private String title;
    
    @JacksonXmlProperty(localName = "room")
    private String room;
    
    public EmployeeXmlDto() {}
    
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