# 🚀 Api-Health-Analyzer

<p align="center">
  <strong>A Java Spring Boot based API monitoring and health-analysis backend</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-25-orange?style=for-the-badge&logo=openjdk" alt="Java 25">
  <img src="https://img.shields.io/badge/Spring%20Boot-4.x-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot">
  <img src="https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Postman-API%20Testing-orange?style=for-the-badge&logo=postman" alt="Postman">
  <img src="https://img.shields.io/badge/Maven-Build-red?style=for-the-badge&logo=apachemaven" alt="Maven">
</p>

---

## 📌 About the Project

**Api-Health-Analyzer** is a backend application designed to register APIs and analyze their availability by sending HTTP requests and measuring their response time.

The current version provides a foundation for a full API monitoring platform. APIs can be registered through REST endpoints, stored in MySQL, retrieved when required, and manually health-checked.

---

## ✨ Features Completed

| Feature | Status |
|---|:---:|
| Spring Boot backend | ✅ |
| MySQL integration | ✅ |
| API registration | ✅ |
| Retrieve all APIs | ✅ |
| Find API by ID | ✅ |
| Manual health check | ✅ |
| HTTP status detection | ✅ |
| Response-time measurement | ✅ |
| API DOWN/error handling | ✅ |
| Postman testing | ✅ |

---

## 🧠 How It Works

```text
              👤 Client / Postman
                      │
                      ▼
             ┌──────────────────┐
             │ ApihpController  │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │   ApihpService   │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │ ApihpRepository  │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │   MySQL / apihp  │
             └──────────────────┘
```

### 🔎 Health Check Flow

```text
      Stored API URL
             │
             ▼
     HealthCheckService
             │
             ▼
      Send HTTP GET
             │
        ┌────┴────┐
        ▼         ▼
    Response    Failure
        │         │
        ▼         ▼
   🟢 API UP   🔴 API DOWN
        │
        ▼
 HTTP Status + Response Time
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| ☕ Java 25 | Core programming language |
| 🌱 Spring Boot | Backend framework |
| 🌐 Spring Web | REST API development |
| 🗄️ MySQL | Persistent database |
| 🔗 Spring Data JPA | Database access |
| ⚙️ Hibernate | ORM |
| 🧪 Postman | API testing |
| 📦 Maven | Dependency/build management |
| 💻 IntelliJ IDEA | Development environment |

---

## 📁 Project Structure

```text
Api-Health-Analyzer/
│
├── 📄 README.md
│
└── 📂 backend/
    └── 📂 api_hp/
        │
        ├── 📄 pom.xml
        │
        └── 📂 src/
            └── 📂 main/
                │
                ├── 📂 java/
                │   └── 📂 com.ansh.api_hp/
                │       │
                │       ├── 📄 ApiHpApplication.java
                │       │
                │       ├── 📂 controller/
                │       │   ├── 📄 ApihpController.java
                │       │   └── 📄 TestController.java
                │       │
                │       ├── 📂 entity/
                │       │   └── 📄 Apihp.java
                │       │
                │       ├── 📂 repository/
                │       │   └── 📄 ApihpRepository.java
                │       │
                │       └── 📂 service/
                │           ├── 📄 ApihpService.java
                │           └── 📄 HealthCheckService.java
                │
                └── 📂 resources/
                    └── 📄 application.properties
```

---

## 🗄️ Database Design

The current project uses a MySQL database named:

```text
apihp
```

The main table is:

```text
apihp
```

### Current Entity

```text
┌───────────────┬─────────────────────────────┐
│ Field         │ Description                 │
├───────────────┼─────────────────────────────┤
│ id            │ Auto-generated primary key  │
│ name          │ API name                    │
│ url           │ API endpoint URL            │
│ active        │ API active/inactive status  │
└───────────────┴─────────────────────────────┘
```

---

# 🌐 REST API Endpoints

## 1️⃣ Register an API

**POST**

```http
http://localhost:8080/api/monitors
```

### Request

```json
{
  "name": "GitHub",
  "url": "https://api.github.com",
  "active": true
}
```

### Example Response

```json
{
  "id": 1,
  "name": "GitHub",
  "url": "https://api.github.com",
  "active": true
}
```

---

## 2️⃣ Get All Registered APIs

**GET**

```http
http://localhost:8080/api/monitors
```

### Example Response

```json
[
  {
    "id": 1,
    "name": "GitHub",
    "url": "https://api.github.com",
    "active": true
  }
]
```

---

## 3️⃣ Check API Health

**GET**

```http
http://localhost:8080/api/monitors/{id}/check
```

### Example

```http
http://localhost:8080/api/monitors/1/check
```

### Successful Response

```text
Status: 200, Response Time: 185 ms
```

This endpoint sends a request to the stored API URL and reports the HTTP status and response time.

If the target API cannot be reached, the service returns an API DOWN message.

---

# 🧪 Testing With Postman

The current REST endpoints have been tested using Postman.

### POST Test

```text
POST
   ↓
/api/monitors
   ↓
JSON request body
   ↓
Spring Boot
   ↓
MySQL
```

### GET Test

```text
GET
   ↓
/api/monitors
   ↓
Spring Boot
   ↓
Stored API records
```

### Health Check Test

```text
GET
   ↓
/api/monitors/1/check
   ↓
HealthCheckService
   ↓
External API
   ↓
HTTP Status + Response Time
```

---

# ⚙️ Setup & Installation

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

```bash
cd Api-Health-Analyzer
```

---

## 2. Open the Backend

Open the following project in IntelliJ IDEA:

```text
backend/api_hp
```

---

## 3. Create the MySQL Database

Run:

```sql
CREATE DATABASE apihp;
```

---

## 4. Configure MySQL

In:

```text
src/main/resources/application.properties
```

configure:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apihp
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 5. Run the Application

Run:

```text
ApiHpApplication.java
```

The backend runs at:

```text
http://localhost:8080
```

---

## 6. Test With Postman

Use Postman to test:

```text
POST  /api/monitors
GET   /api/monitors
GET   /api/monitors/{id}/check
```

---

# 📊 Current Development Progress

```text
Spring Boot Setup          ████████████████████ ✅
MySQL Integration          ████████████████████ ✅
Entity                     ████████████████████ ✅
Repository                 ████████████████████ ✅
Service                    ████████████████████ ✅
Controller                 ████████████████████ ✅
POST API                   ████████████████████ ✅
GET API                    ████████████████████ ✅
Manual Health Check        ████████████████████ ✅
Automatic Monitoring       ████████████████████ ✅
Health History             ████████████████████ ✅ 
Uptime Analytics           ████████████████████ ✅

Frontend Dashboard         ░░░░░░░░░░░░░░░░░░░░ ⏳
Charts & Visualization     ░░░░░░░░░░░░░░░░░░░░ ⏳
Cloud Deployment           ░░░░░░░░░░░░░░░░░░░░ ⏳
```

---

# 🚀 Future Roadmap

The project will evolve from a simple API checker into a complete monitoring platform.

### Phase 1 — Monitoring Engine
- ⏱️ Automatic scheduled health checks
- 📝 Store every health-check result
- 🔴🟢 Track API UP/DOWN status
- ⚠️ Timeout and error handling

### Phase 2 — Analytics
- 📈 Response-time history
- 📊 Uptime percentage
- 🕐 Last checked timestamp
- 📉 Health trends
- 🔎 Monitoring history

### Phase 3 — Frontend
- ⚛️ React dashboard
- 🟢 Live API status cards
- 📊 Response-time charts
- 📈 Uptime graphs
- 🔍 Search and filtering

### Phase 4 — Production
- 🐳 Docker containerization
- ☁️ Cloud deployment
- 🔐 Environment-based configuration
- 🔔 Failure notifications
- 📋 API documentation

---

# 🎓 Learning Outcomes

This project provides practical experience with:

- Java and Object-Oriented Programming
- Spring Boot application development
- REST API design
- Layered architecture
- Dependency Injection
- Spring Data JPA
- Hibernate ORM
- MySQL database integration
- HTTP requests and status codes
- API health monitoring concepts
- Postman API testing
- Exception handling
- Maven
- Git and GitHub

---

# 👨‍💻 Author

**Ansh Verma**

B.Tech — Computer Science & Engineering

---

<p align="center">
  <strong>🚀 Api-Health-Analyzer</strong><br>
  <em>Building the foundation for smarter API monitoring.</em>
</p>
