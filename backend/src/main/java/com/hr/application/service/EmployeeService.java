package com.hr.application.service;

import com.hr.application.dto.EmployeeDto;
import com.hr.application.entity.Employee;
import com.hr.application.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<EmployeeDto> getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public List<EmployeeDto> searchEmployeesByName(String name) {
        return employeeRepository.findByNameContaining(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = convertToEntity(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDto(savedEmployee);
    }
    
    public Optional<EmployeeDto> updateEmployee(Long id, EmployeeDto employeeDto) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setFirstName(employeeDto.getFirstName());
                    employee.setLastName(employeeDto.getLastName());
                    employee.setDivision(employeeDto.getDivision());
                    employee.setBuilding(employeeDto.getBuilding());
                    employee.setTitle(employeeDto.getTitle());
                    employee.setRoom(employeeDto.getRoom());
                    return convertToDto(employeeRepository.save(employee));
                });
    }
    
    public boolean deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public void saveAllEmployees(List<Employee> employees) {
        employeeRepository.saveAll(employees);
    }
    
    private EmployeeDto convertToDto(Employee employee) {
        return new EmployeeDto(
            employee.getEmployeeId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getDivision(),
            employee.getBuilding(),
            employee.getTitle(),
            employee.getRoom()
        );
    }
    
    private Employee convertToEntity(EmployeeDto dto) {
        Employee employee = new Employee();
        employee.setEmployeeId(dto.getEmployeeId());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setDivision(dto.getDivision());
        employee.setBuilding(dto.getBuilding());
        employee.setTitle(dto.getTitle());
        employee.setRoom(dto.getRoom());
        return employee;
    }
}