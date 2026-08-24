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

**Api-Health-Analyzer** is a Java Spring Boot backend application designed to register APIs, monitor their availability, measure response performance, store health-check history, and generate health-analysis statistics.

The application provides REST APIs for API management and health checking, stores data using MySQL, performs automated health checks through a scheduler, and analyzes collected results to determine API availability and performance.

---

## ✨ Features Completed

| Feature | Status |
|---|:---:|
| Spring Boot backend | ✅ |
| MySQL integration | ✅ |
| API registration | ✅ |
| Retrieve all APIs | ✅ |
| Find API by ID | ✅ |
| Delete API | ✅ |
| Manual health check | ✅ |
| HTTP status detection | ✅ |
| Response-time measurement | ✅ |
| API UP/DOWN detection | ✅ |
| Health-check history | ✅ |
| Recent health checks | ✅ |
| Uptime calculation | ✅ |
| Health analysis | ✅ |
| Response-time analysis | ✅ |
| Automated health checks | ✅ |
| Automatic old health-check cleanup (30 days) | ✅ |
| Request validation | ✅ |
| Custom exception handling | ✅ |
| Global exception handling | ✅ |
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
                 └───────┬──────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
     ┌──────────────────┐   ┌──────────────────┐
     │ Apihprepository  │   │ HpChckrService   │
     └────────┬─────────┘   └────────┬─────────┘
              │                      │
              ▼                      ▼
       ┌─────────────┐       ┌────────────────┐
       │ MySQL /     │       │  HealthCheck   │
       │   apihp     │       └───────┬────────┘
       └─────────────┘               │
                                     ▼
                            ┌──────────────────┐
                            │ HealthAnalysis   │
                            └──────────────────┘

                     ▲
                     │
             ┌───────┴────────┐
             │AutomateScheduler│
             └────────────────┘
```

---

### 🔎 Manual Health Check Flow

```text
       Stored API URL
             │
             ▼
      HpChckrService
             │
             ▼
       Send HTTP Request
             │
        ┌────┴────┐
        ▼         ▼
    Response    Failure
        │         │
        ▼         ▼
   🟢 API UP   🔴 API DOWN
        │         │
        └────┬────┘
             ▼
     HTTP Status +
     Response Time
             │
             ▼
        HealthCheck
```

---

### 🤖 Automated Health Check Flow

```text
       Registered APIs
              │
              ▼
      AutomateScheduler
              │
              ▼
        HpChckrService
              │
              ▼
       HTTP Health Check
              │
       ┌──────┴──────┐
       ▼             ▼
   Successful      Failed
       │             │
       └──────┬──────┘
              ▼
        HealthCheck
              │
              ▼
        MySQL Storage
              │
              ▼
       Health Analysis
```

---

## 📊 Health Analysis

The application analyzes stored health-check results to provide a consolidated view of API health and performance.

### Analysis Data

```text
apiId
totalChecks
successfulChecks
failedChecks
uptimePercentage
averageResponseTime
fastestResponse
```

Additional health-analysis information is used to understand recent API behavior, response-time trends, failures, and alert conditions.

### Example

```json
{
  "apiId": 1,
  "totalChecks": 20,
  "successfulChecks": 18,
  "failedChecks": 2,
  "uptimePercentage": 90.0,
  "averageResponseTime": 245.5,
  "fastestResponse": 120
}
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
| 📦 Maven | Dependency management |
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
             └──📂 main/
                │
                ├── 📂 java/
                │   └── 📂 com/ansh/api_hp/
                │       │
                │       ├── 📄 ApiHpApplication.java
                │       │
                │       ├── 📂 controller/
                │       │   └── 📄 ApihpController.java
                │       │
                │       ├── 📂 entity/
                │       │   ├── 📄 Apihp.java
                │       │   ├── 📄 HealthCheck.java
                │       │   └── 📄 HealthAnalysis.java
                │       │
                │       ├── 📂 repository/
                │       │   ├── 📄 Apihprepository.java
                │       │   └── 📄 HealthCheckRepository.java
                │       │
                │       ├── 📂 service/
                │       │   ├── 📄 ApihpService.java
                │       │   ├── 📄 HpChckrService.java
                │       │   └── 📄 AutomateScheduler.java
                │       │
                │       └── 📂 exception/
                │           ├── 📄 ApiNotFoundException.java
                │           └── 📄 GlobalExceptionHandler.java
                │
                └── 📂 resources/
                    └── 📄 application.properties
```

---

## 🗄️ Database Design

The project uses a MySQL database named:

```text
apihp
```

### 📌 API Entity

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

### 📌 HealthCheck Entity

Stores individual API health-check results, including API status, HTTP response information, response time, and check timestamp.

### 📌 HealthAnalysis Entity

Stores/calculates aggregated health and performance information from health-check results.

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

---

## 2️⃣ Get All Registered APIs

**GET**

```http
http://localhost:8080/api/monitors
```

---

## 3️⃣ Get API by ID

**GET**

```http
http://localhost:8080/api/monitors/{id}
```

---

## 4️⃣ Delete an API

**DELETE**

```http
http://localhost:8080/api/monitors/{id}
```

Deletes the selected API and its associated health-check records.

---

## 5️⃣ Check API Health

**GET**

```http
http://localhost:8080/api/monitors/{id}/check
```

The application contacts the registered API and measures its HTTP response and response time.

---

## 6️⃣ Health-Check History

**GET**

```http
http://localhost:8080/api/monitors/{id}/history
```

Returns previously recorded health-check results for the selected API.

---

## 7️⃣ Recent Health Checks

**GET**

```http
http://localhost:8080/api/monitors/{id}/recent
```

Returns the most recent health-check records.

---

## 8️⃣ Uptime Analysis

**GET**

```http
http://localhost:8080/api/monitors/{id}/uptime
```

Returns the calculated uptime percentage based on recorded health checks.

---

## 9️⃣ Complete Health Analysis

**GET**

```http
http://localhost:8080/api/monitors/{id}/analysis
```

Returns the calculated health and performance analysis for the selected API.

---

# 🧹 Database Cleanup

The backend includes automatic cleanup of old health-check history to prevent the database from growing indefinitely.

### Automatic Health-Check Cleanup

- 🗓️ Runs automatically through `AutomateScheduler`
- 🧹 Deletes health-check records older than **30 days**
- 🔒 Uses a transactional cleanup operation for safe database deletion
- 💾 Keeps recent health-check history available for analysis

The cleanup is handled by the repository method:

```java
healthCheckRepository.deleteOlderThan(cutoff);
```

where the cutoff is calculated using:

```java
LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
```

---

# 🛡️ Validation & Exception Handling

## ✅ Request Validation

The project validates API information before saving it.

Example:

```java
@NotBlank(message = "API name cannot be empty")
private String name;

@NotBlank(message = "API URL cannot be empty")
@URL(message = "API URL must be valid")
private String url;
```

The controller activates validation using:

```java
@Valid @RequestBody Apihp apihp
```

Invalid requests result in:

```text
400 Bad Request
```

---

## ⚠️ Custom Exception Handling

The project uses:

```text
ApiNotFoundException
```

when an API with the requested ID doesn't exist.

Example:

```http
GET /api/monitors/999
```

The `GlobalExceptionHandler` returns a clean response:

```json
{
  "status": 404,
  "error": "API Not Found",
  "message": "No API exists with id: 999"
}
```

---

# 🧪 Testing With Postman

The REST API has been tested using Postman.

### Tested Operations

```text
POST  /api/monitors
DELETE /api/monitors/{id}
GET   /api/monitors
GET   /api/monitors/{id}
GET   /api/monitors/{id}/check
GET   /api/monitors/{id}/history
GET   /api/monitors/{id}/recent
GET   /api/monitors/{id}/uptime
GET   /api/monitors/{id}/analysis
```

Also tested:

- ✅ Request validation
- ✅ Invalid API ID handling
- ✅ Database persistence
- ✅ Automated health checking

---

# ⚙️ Setup & Installation

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd Api-Health-Analyzer
```

## 2. Open the Backend

Open the following project in IntelliJ IDEA:

```text
backend/api_hp
```

## 3. Create the MySQL Database

```sql
CREATE DATABASE apihp;
```

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

> ⚠️ Never commit your real database password or other sensitive credentials to GitHub.

## 5. Run the Application

Run:

```text
ApiHpApplication.java
```

The backend will be available at:

```text
http://localhost:8080
```

## 6. Test With Postman

Use the REST endpoints listed above to test the application.

---

# 📊 Current Development Progress

```text
Spring Boot Setup          ████████████████████ ✅
MySQL Integration          ████████████████████ ✅
Entity Layer               ████████████████████ ✅
Repository Layer           ████████████████████ ✅
Service Layer              ████████████████████ ✅
Controller Layer           ████████████████████ ✅
POST API                   ████████████████████ ✅
GET All APIs               ████████████████████ ✅
GET API by ID              ████████████████████ ✅
Manual Health Check        ████████████████████ ✅
Health-Check Storage       ████████████████████ ✅
Delete API                 ████████████████████ ✅
Health History             ████████████████████ ✅
Uptime Analysis            ████████████████████ ✅
Health Analysis            ████████████████████ ✅
Automated Health Checks    ████████████████████ ✅
Automatic Data Cleanup     ████████████████████ ✅
Validation                 ████████████████████ ✅
Exception Handling         ████████████████████ ✅
Postman Testing            ████████████████████ ✅

Frontend Dashboard         ░░░░░░░░░░░░░░░░░░░░ ⏳
Charts & Visualization     ░░░░░░░░░░░░░░░░░░░░ ⏳
Cloud Deployment           ░░░░░░░░░░░░░░░░░░░░ ⏳
```

---

# 🚀 Future Roadmap

### Phase 1 — Monitoring Engine

- ⏱️ Automated scheduled health checks
- 📝 Store health-check results
- 🟢🔴 Track API UP/DOWN status
- ⚠️ Failure and error handling
- 📜 Health-check history

### Phase 2 — Analytics

- 📈 Response-time history
- 📊 Uptime percentage
- 🕐 Last checked information
- 📉 Response-time trends
- 🔎 Historical health analysis
- 🚨 Health alerts

### Phase 3 — Frontend

- ⚛️ React dashboard
- 🟢 Live API status cards
- 📊 Response-time charts
- 📈 Uptime graphs
- 🔍 Search and filtering
- 📋 API management interface

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
- API health monitoring
- Automated scheduling
- Database cleanup and data-retention management
- Health and performance analysis
- Request validation
- Exception handling
- Postman API testing
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
