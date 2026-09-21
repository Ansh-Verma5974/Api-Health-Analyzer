# 🚀 API Health Analyzer

```{=html}
<p align="center">
```
`<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&pause=1000&color=168CFF&center=true&vCenter=true&width=700&lines=Monitor+APIs+%7C+Analyze+Health+%7C+Track+Performance;Java+Spring+Boot+%2B+React+%2B+MySQL;Full-Stack+API+Monitoring+Dashboard" alt="Typing animation">`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<strong>`{=html}A full-stack API monitoring and health-analysis
platform built with Java Spring Boot, React, and
MySQL.`</strong>`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/Java-25-orange?style=for-the-badge&logo=openjdk" alt="Java 25">`{=html}
`<img src="https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot">`{=html}
`<img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">`{=html}
`<img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">`{=html}
`<img src="https://img.shields.io/badge/Recharts-Analytics-FF6384?style=for-the-badge" alt="Recharts">`{=html}
`<img src="https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven">`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<a href="https://github.com/Ansh-Verma5974/Api-Health-Analyzer">`{=html}
`<img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">`{=html}
`</a>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## 🌐 What is API Health Analyzer?

**API Health Analyzer** is a full-stack web application that monitors
registered API endpoints, performs health checks, measures response
time, stores historical results, calculates uptime, and provides
performance analytics through an interactive React dashboard.

The project combines a **Spring Boot REST backend**, **MySQL persistence
layer**, and **React/Vite frontend** into a single monitoring workflow.

``` text
                         API HEALTH ANALYZER
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
        🖥️ React Frontend                  ⚙️ Spring Boot Backend
              │                                   │
              │                         ┌─────────┴─────────┐
              │                         │                   │
              │                    Health Checks       Analytics
              │                         │                   │
              └─────────────── REST API / JSON ─────────────┘
                                        │
                                        ▼
                                  🗄️ MySQL
```

------------------------------------------------------------------------

# ✨ Features

## 🖥️ Frontend

  Feature                              Status
  ----------------------------------- --------
  React + Vite dashboard                 ✅
  React Router navigation                ✅
  Dashboard statistics                   ✅
  Live API health status                 ✅
  Uptime visualization                   ✅
  API management page                    ✅
  Add API                                ✅
  Delete API                             ✅
  API search                             ✅
  API details page                       ✅
  Analytics dashboard                    ✅
  Recharts visualizations                ✅
  History page                           ✅
  History filtering                      ✅
  History search                         ✅
  Load More history                      ✅
  Settings page                          ✅
  Light / Dark theme                     ✅
  Configurable auto-refresh              ✅
  Configurable refresh interval          ✅
  Configurable delete confirmation       ✅
  Configurable API auto-scroll           ✅
  LocalStorage settings persistence      ✅
  Responsive UI styling                  ✅

## ⚙️ Backend

  Feature                         Status
  ------------------------------ --------
  Spring Boot REST backend          ✅
  MySQL integration                 ✅
  API registration                  ✅
  Retrieve all APIs                 ✅
  Retrieve API by ID                ✅
  Delete API                        ✅
  Manual health checks              ✅
  HTTP status detection             ✅
  Response-time measurement         ✅
  UP / DOWN detection               ✅
  Health-check history              ✅
  Recent health checks              ✅
  Uptime calculation                ✅
  Health analysis                   ✅
  Response-time trend analysis      ✅
  Consecutive failure tracking      ✅
  Automated health checks           ✅
  Scheduled old-record cleanup      ✅
  Request validation                ✅
  Custom exception handling         ✅
  Global exception handling         ✅
  Postman testing                   ✅

------------------------------------------------------------------------

# 🧩 Technology Stack

### Backend

-   ☕ **Java 25**
-   🌱 **Spring Boot 4.1.1**
-   🌐 **Spring Web**
-   🔗 **Spring Data JPA**
-   🧩 **Hibernate**
-   🗄️ **MySQL**
-   📦 **Maven**
-   🌍 **Java HttpClient**
-   ⏱️ **Spring Scheduler**

### Frontend

-   ⚛️ **React**
-   ⚡ **Vite**
-   🧭 **React Router**
-   📊 **Recharts**
-   🎨 **CSS**
-   🔄 **Fetch API**
-   💾 **Browser LocalStorage**

### Development & Testing

-   💻 IntelliJ IDEA
-   🧪 Postman
-   🔧 Git
-   🐙 GitHub
-   🟢 Node.js / npm

------------------------------------------------------------------------

# 🏗️ Application Architecture

``` text
                         ┌─────────────────────────┐
                         │       React UI           │
                         │     localhost:5173      │
                         └────────────┬────────────┘
                                      │
                                Fetch / JSON
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │    Spring Boot REST     │
                         │     localhost:8080      │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
              Controller          Services         Scheduler
                    │                 │                 │
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      │
                                      ▼
                               Spring Data JPA
                                      │
                                      ▼
                                ┌───────────┐
                                │   MySQL   │
                                └───────────┘
                                      │
                                      ▼
                              Health Check Data
```

------------------------------------------------------------------------

# 🔄 How Monitoring Works

## 1. Register an API

The user adds:

``` text
API Name
API URL
Active Status
```

The frontend sends the data to:

``` http
POST /api/monitors
```

The backend stores the API in MySQL.

------------------------------------------------------------------------

## 2. Perform a Health Check

When an API is checked:

``` text
Registered API
      │
      ▼
HpChckrService
      │
      ▼
Java HttpClient
      │
      ▼
External API
      │
 ┌────┴─────┐
 ▼          ▼
Success    Failure
 │          │
 ▼          ▼
UP         DOWN
 │          │
 └────┬─────┘
      ▼
HTTP Status
Response Time
      │
      ▼
HealthCheck
      │
      ▼
MySQL
```

The backend records:

-   API ID
-   Check timestamp
-   HTTP status
-   Response time
-   `UP` / `DOWN` status

------------------------------------------------------------------------

# 🤖 Automated Monitoring

The backend contains `AutomateScheduler`, which automatically checks
active APIs.

``` text
                 AutomateScheduler
                         │
                         ▼
                  Get all APIs
                         │
                         ▼
                   Active APIs?
                    /       \
                  Yes        No
                   │          │
                   ▼          └── Skip
             HpChckrService
                   │
                   ▼
             HTTP Health Check
                   │
                   ▼
             Save HealthCheck
                   │
                   ▼
                  MySQL
```

The current scheduled health-check job runs every **60 seconds** for
active APIs.

------------------------------------------------------------------------

# 📊 Health Analysis

The backend calculates health and performance metrics from stored
health-check records.

### Metrics

``` text
totalChecks
successfulChecks
failedChecks
uptimePercentage
averageResponseTime
fastestResponseTime
slowestResponseTime
lastStatus
lastHttpStatus
lastResponseTime
consecutiveFailures
recentAverageResponseTime
previousAverageResponseTime
responseTimeTrend
healthStatus
alert
alertMessage
```

### Response-Time Trend

When enough historical checks are available, the application compares
recent response-time performance with the previous set of checks to
identify the response-time trend.

------------------------------------------------------------------------

# 📈 Analytics Dashboard

The React Analytics page uses **Recharts** to visualize monitoring data.

It provides:

-   📈 Response-time trends
-   📊 API performance comparison
-   🐢 Slowest APIs
-   ⚡ Fastest APIs
-   🥧 Response-time distribution
-   🔎 API selection
-   💡 Reliability insights

The Analytics page is designed to provide a performance-focused view
rather than simply repeating the Dashboard statistics.

------------------------------------------------------------------------

# 📄 Application Pages

## 🏠 Dashboard

Provides a high-level monitoring overview.

``` text
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Total APIs   │ Healthy APIs │ Failed APIs  │    Uptime    │
└──────────────┴──────────────┴──────────────┴──────────────┘

                 Monitored APIs
        ┌─────────────────────────────┐
        │ API │ Endpoint │ Status │ RT │
        ├─────────────────────────────┤
        │ ...                         │
        └─────────────────────────────┘
```

------------------------------------------------------------------------

## 🔗 APIs

The API management page supports:

-   Add API
-   Search API
-   Refresh
-   View details
-   Delete API
-   Status display
-   Response-time display
-   Auto-scrolling API list

------------------------------------------------------------------------

## 🔎 API Details

Displays detailed information for an individual API:

-   Current status
-   Uptime
-   Average response time
-   Fastest response
-   Slowest response
-   Health analysis
-   Alerts
-   Recent checks

------------------------------------------------------------------------

## 📈 Analytics

Provides visual performance analysis using Recharts.

------------------------------------------------------------------------

## ⏱️ History

Displays recorded health-check activity with:

-   API
-   Timestamp
-   Status
-   HTTP status
-   Response time

Supports API filtering, search, refresh, and Load More.

------------------------------------------------------------------------

## ⚙️ Settings

Users can configure:

### Appearance

-   ☀️ Light mode
-   🌙 Dark mode

### Dashboard Behavior

-   Auto-refresh
-   Refresh interval

### API Management

-   Delete confirmation
-   API list auto-scroll

Settings are stored in browser LocalStorage.

------------------------------------------------------------------------

# 🗄️ Database Design

The application uses **MySQL** for persistent monitoring data.

### API Entity

``` text
┌───────────────┬──────────────────────────────┐
│ Field         │ Description                  │
├───────────────┼──────────────────────────────┤
│ id            │ Primary key                  │
│ name          │ API name                     │
│ url           │ API endpoint                 │
│ active        │ Monitoring enabled/disabled  │
└───────────────┴──────────────────────────────┘
```

### HealthCheck Entity

Stores individual monitoring results:

``` text
apiId
checkedAt
httpStatus
responseTime
status
```

### HealthAnalysis

Provides calculated health and performance information from health-check
data.

------------------------------------------------------------------------

# 🌐 REST API

Base URL:

``` text
http://localhost:8080/api/monitors
```

  Method     Endpoint                        Purpose
  ---------- ------------------------------- ----------------------
  `POST`     `/api/monitors`                 Add API
  `GET`      `/api/monitors`                 Get all APIs
  `GET`      `/api/monitors/{id}`            Get API by ID
  `DELETE`   `/api/monitors/{id}`            Delete API
  `GET`      `/api/monitors/{id}/check`      Perform health check
  `GET`      `/api/monitors/{id}/history`    Get full history
  `GET`      `/api/monitors/{id}/recent`     Get recent checks
  `GET`      `/api/monitors/{id}/uptime`     Calculate uptime
  `GET`      `/api/monitors/{id}/analysis`   Get health analysis

------------------------------------------------------------------------

# 🛡️ Validation & Exception Handling

The backend validates incoming API information before persistence.

Example validation includes:

``` java
@NotBlank
private String name;

@NotBlank
@URL
private String url;
```

The application also uses:

``` text
ApiNotFoundException
GlobalExceptionHandler
```

to provide controlled error responses for invalid API IDs and validation
failures.

------------------------------------------------------------------------

# 🧹 Health-Check Data Cleanup

The backend includes scheduled cleanup for older health-check records.

The cleanup operation is transactional and uses:

``` java
healthCheckRepository.deleteOlderThan(cutoff);
```

The current scheduler configuration removes records older than the
configured cleanup threshold.

------------------------------------------------------------------------

# 📁 Project Structure

``` text
Api-Health-Analyzer/
│
├── README.md
│
├── backend/
│   └── api_hp/
│       ├── pom.xml
│       └── src/
│           └── main/
│               ├── java/
│               │   └── com/ansh/api_hp/
│               │       ├── ApiHpApplication.java
│               │       │
│               │       ├── controller/
│               │       │   └── ApihpController.java
│               │       │
│               │       ├── entity/
│               │       │   ├── Apihp.java
│               │       │   ├── HealthCheck.java
│               │       │   └── HealthAnalysis.java
│               │       │
│               │       ├── repository/
│               │       │   ├── Apihprepository.java
│               │       │   └── HealthCheckRepository.java
│               │       │
│               │       ├── service/
│               │       │   ├── ApihpService.java
│               │       │   ├── HpChckrService.java
│               │       │   └── AutomateScheduler.java
│               │       │
│               │       └── exception/
│               │           ├── ApiNotFoundException.java
│               │           └── GlobalExceptionHandler.java
│               │
│               └── resources/
│                   └── application.properties
│
└── frontend/
    └── api-health-ui/
        ├── package.json
        ├── vite.config.js
        ├── index.html
        │
        └── src/
            ├── App.jsx
            ├── App.css
            ├── index.css
            ├── main.jsx
            │
            ├── components/
            │   ├── Sidebar.jsx
            │   ├── Topbar.jsx
            │   └── ApiTable.jsx
            │
            ├── layouts/
            │   └── MainLayout.jsx
            │
            ├── pages/
            │   ├── Dashboard.jsx
            │   ├── APIs.jsx
            │   ├── ApiDetails.jsx
            │   ├── Analytics.jsx
            │   ├── History.jsx
            │   └── Settings.jsx
            │
            ├── services/
            │   └── apiService.js
            │
            └── context/
                └── SettingsContext.jsx
```

------------------------------------------------------------------------

# 🚀 Getting Started

## Prerequisites

Install:

-   JDK 25
-   Maven
-   MySQL
-   Node.js
-   npm
-   IntelliJ IDEA

------------------------------------------------------------------------

## 1️⃣ Clone

``` bash
git clone https://github.com/Ansh-Verma5974/Api-Health-Analyzer.git
cd Api-Health-Analyzer
```

------------------------------------------------------------------------

## 2️⃣ Configure MySQL

Create the database used by your backend:

``` sql
CREATE DATABASE apihp;
```

Configure your local database credentials in:

``` text
backend/api_hp/src/main/resources/application.properties
```

Example:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/apihp
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

> ⚠️ Do not commit real passwords or credentials to GitHub.

------------------------------------------------------------------------

## 3️⃣ Start Backend

Open the backend in IntelliJ IDEA and run:

``` text
ApiHpApplication.java
```

Backend:

``` text
http://localhost:8080
```

------------------------------------------------------------------------

## 4️⃣ Start Frontend

Open a terminal inside:

``` text
frontend/api-health-ui
```

Install dependencies:

``` bash
npm install
```

Start Vite:

``` bash
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# 🧪 Testing

The backend REST API has been tested using Postman.

Core operations include:

``` text
POST    /api/monitors
GET     /api/monitors
GET     /api/monitors/{id}
DELETE  /api/monitors/{id}
GET     /api/monitors/{id}/check
GET     /api/monitors/{id}/history
GET     /api/monitors/{id}/recent
GET     /api/monitors/{id}/uptime
GET     /api/monitors/{id}/analysis
```

The React frontend consumes these backend endpoints through the
centralized:

``` text
src/services/apiService.js
```

------------------------------------------------------------------------

# 🔗 Frontend ↔ Backend Integration

``` text
React Component
      │
      ▼
apiService.js
      │
      ▼
Fetch API
      │
      ▼
Spring Boot REST Controller
      │
      ▼
Service Layer
      │
      ▼
Repository
      │
      ▼
MySQL
```

Example:

``` javascript
const response = await fetch(
    "http://localhost:8080/api/monitors"
);
```

The response is then used by React to update the dashboard and other
pages.

------------------------------------------------------------------------

# 🎯 What This Project Demonstrates

This project demonstrates practical implementation of:

-   Java programming
-   Spring Boot
-   REST API development
-   Layered backend architecture
-   Dependency Injection
-   Spring Data JPA
-   Hibernate
-   MySQL
-   HTTP client programming
-   Scheduled background tasks
-   CRUD operations
-   API monitoring
-   Response-time measurement
-   Data persistence
-   Exception handling
-   Request validation
-   React component architecture
-   React Router
-   Context API
-   LocalStorage
-   REST API integration
-   Data visualization
-   Full-stack development

------------------------------------------------------------------------

# 🔮 Future Enhancements

Potential future improvements:

-   🔐 User authentication and authorization
-   📧 Email alerts
-   🔔 Real-time failure notifications
-   ☁️ Cloud deployment
-   🐳 Docker support
-   📱 More responsive/mobile-focused UI
-   📊 Exportable monitoring reports
-   👥 Role-based access
-   ⚙️ Frontend control for monitoring schedules

------------------------------------------------------------------------

# 👨‍💻 Author

```{=html}
<p align="center">
```
`<strong>`{=html}Ansh Verma`</strong>`{=html}`<br>`{=html} B.Tech ---
Computer Science & Engineering
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<a href="https://github.com/Ansh-Verma5974">`{=html}
`<img src="https://img.shields.io/badge/GitHub-Ansh--Verma5974-181717?style=for-the-badge&logo=github" alt="GitHub">`{=html}
`</a>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

# ⭐ Project Repository

```{=html}
<p align="center">
```
`<a href="https://github.com/Ansh-Verma5974/Api-Health-Analyzer">`{=html}
`<img src="https://img.shields.io/badge/View%20Project%20on%20GitHub-→-168CFF?style=for-the-badge&logo=github" alt="View Project">`{=html}
`</a>`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<strong>`{=html}🚀 Monitor. Analyze.
Improve.`</strong>`{=html}`<br>`{=html} `<em>`{=html}Built as a Java
full-stack project for learning and practical development.`</em>`{=html}
```{=html}
</p>
```
