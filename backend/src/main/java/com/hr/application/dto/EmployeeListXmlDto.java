package com.hr.application.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import java.util.List;

@JacksonXmlRootElement(localName = "employees")
public class EmployeeListXmlDto {
    
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "employee")
    private List<EmployeeXmlDto> employees;
    
    public EmployeeListXmlDto() {}
    
    public List<EmployeeXmlDto> getEmployees() {
        return employees;
    }
    
    public void setEmployees(List<EmployeeXmlDto> employees) {
        this.employees = employees;
    }
}