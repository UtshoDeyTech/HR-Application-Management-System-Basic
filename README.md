# HR Management System

A complete HR management application built with Spring Boot, Angular, and Oracle Database, containerized with Docker.

## Features

- **List Employees**: View all employees with their details
- **Search by Employee ID**: Find specific employees using their ID
- **Search by Name**: Search employees by first name or last name
- **Update Employee Record**: Edit employee information
- **Delete Employee Record**: Remove employees from the system
- **Import XML Data**: Bulk import employee data from XML files

## Technology Stack

- **Backend**: Java 17, Spring Boot 3.2, Spring Data JPA
- **Frontend**: Angular 17, Bootstrap 5
- **Database**: Oracle Database XE 21c
- **Containerization**: Docker, Docker Compose

## Project Structure

```
HR Application/
├── backend/                 # Spring Boot backend
├── frontend/               # Angular frontend
├── init-scripts/           # Oracle database initialization scripts
├── docker-compose.yml      # Docker composition file
├── sample-employees.xml    # Sample XML data for import
└── README.md
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- At least 8GB RAM available for Oracle Database

### Running the Application

1. **Clone or download the project files**

2. **Start all services with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

3. **Wait for services to start** (Oracle DB may take 2-3 minutes to initialize):
   - Oracle Database: `localhost:1521`
   - Backend API: `http://localhost:8080`
   - Frontend: `http://localhost:4200`

4. **Access the application**:
   Open your browser and go to `http://localhost:4200`

### First Time Setup

1. The Oracle database will automatically create the `hr` user with necessary privileges
2. The Spring Boot application will create the required tables automatically
3. Use the sample XML file (`sample-employees.xml`) to import initial data

## API Endpoints

- `GET /api/employees` - List all employees
- `GET /api/employees/{id}` - Get employee by ID
- `GET /api/employees/search?name={name}` - Search employees by name
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `POST /api/employees/import-xml` - Import employees from XML

## XML Import Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<employees>
  <employee>
    <firstName>John</firstName>
    <lastName>Doe</lastName>
    <division>IT</division>
    <building>Building A</building>
    <title>Software Engineer</title>
    <room>101</room>
  </employee>
</employees>
```

## Database Configuration

- **Host**: oracle (container) / localhost (external)
- **Port**: 1521
- **SID**: XE
- **Username**: hr
- **Password**: hr123

## Development

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Development
```bash
cd frontend
npm install
npm start
```

## Troubleshooting

### Oracle Database Issues
- Ensure you have at least 8GB RAM available
- Oracle container may take 2-3 minutes to fully initialize
- Check logs: `docker-compose logs oracle`

### Connection Issues
- Verify all containers are running: `docker-compose ps`
- Check network connectivity between containers
- Ensure ports 1521, 8080, and 4200 are not in use by other applications

### Memory Issues
- Increase Docker memory allocation to at least 8GB
- Close other memory-intensive applications

## Production Deployment

This docker-compose configuration is production-ready and includes:
- Health checks for all services
- Proper networking between containers
- Persistent data storage for Oracle
- Optimized Docker images
- Nginx reverse proxy for the frontend

## License

This project is created for educational and interview purposes.