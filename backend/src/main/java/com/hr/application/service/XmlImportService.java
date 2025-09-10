package com.hr.application.service;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.hr.application.dto.EmployeeListXmlDto;
import com.hr.application.dto.EmployeeXmlDto;
import com.hr.application.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class XmlImportService {
    
    @Autowired
    private EmployeeService employeeService;
    
    private final XmlMapper xmlMapper = new XmlMapper();
    
    public int importEmployeesFromXml(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        
        if (!file.getOriginalFilename().toLowerCase().endsWith(".xml")) {
            throw new IllegalArgumentException("File must be an XML file");
        }
        
        try {
            EmployeeListXmlDto employeeListDto = xmlMapper.readValue(
                file.getInputStream(), EmployeeListXmlDto.class);
            
            List<Employee> employees = employeeListDto.getEmployees().stream()
                .map(this::convertXmlDtoToEntity)
                .collect(Collectors.toList());
            
            employeeService.saveAllEmployees(employees);
            
            return employees.size();
        } catch (Exception e) {
            throw new IOException("Error parsing XML file: " + e.getMessage(), e);
        }
    }
    
    private Employee convertXmlDtoToEntity(EmployeeXmlDto xmlDto) {
        Employee employee = new Employee();
        employee.setFirstName(xmlDto.getFirstName());
        employee.setLastName(xmlDto.getLastName());
        employee.setDivision(xmlDto.getDivision());
        employee.setBuilding(xmlDto.getBuilding());
        employee.setTitle(xmlDto.getTitle());
        employee.setRoom(xmlDto.getRoom());
        return employee;
    }
}