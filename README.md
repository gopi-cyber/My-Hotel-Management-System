# LuxeStay - Enterprise Hotel Management System

<div align="center">

![Status](https://img.shields.io/badge/Status-Release%20Candidate-blue)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203%20%7C%20Hibernate%20%7C%20JSP-orange)
![Database](https://img.shields.io/badge/Database-MySQL%208.0%2B-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016%20%7C%20React%2019-black)

</div>

## 🏨 Project Overview

**LuxeStay** is a full-stack Hotel Management System designed with enterprise-style architecture and release checks. It features a Java backend with Hibernate ORM, MySQL persistence, Spring Boot 3, and JSP, alongside a modern Next.js 16 frontend.

---

## 🏛️ Architecture & Tech Stack

### ☕ Backend (Java Enterprise)
- **Framework**: Spring Boot 3 (Java 21)
- **ORM / Persistence**: Hibernate 6 / Spring Data JPA
- **Database**: MySQL 8.0+ with HikariCP connection pooling
- **Views & UI**: JSP (JavaServer Pages), JSTL, Bootstrap 5, Glassmorphism CSS
- **API Documentation**: SpringDoc OpenAPI / Swagger UI
- **Embedded Web Server**: Apache Tomcat 10+ with Jasper JSP Engine

### 🌐 Frontend (Next.js)
- **Framework**: Next.js 16 (Turbopack, App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS & Lucide Icons

---

## 🚀 Quick Start Guide

### 1. Database Setup (MySQL)
1. Open your MySQL client (MySQL Workbench, phpMyAdmin, or CLI).
2. Execute the included [hotel_management_db.sql](file:///d:/clg_project/hotel_management_db.sql) script:
   ```sql
   source hotel_management_db.sql;
   ```
3. Keep credentials outside source control and set them in the terminal that starts the app:
   ```bat
   set DB_USERNAME=root
   set DB_PASSWORD=your_mysql_password
   ```
   `DB_USERNAME` defaults to `root`; `DB_PASSWORD` is intentionally required.

---

### 2. Running the Java Spring Boot + JSP Backend
```bash
set DB_PASSWORD=your_mysql_password
cd backend
mvnw.cmd spring-boot:run
# Or on Windows:
run.bat
```
- 🌐 **Web App (JSP)**: [http://localhost:8080](http://localhost:8080)
- 📄 **Interactive Swagger API Docs**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- 🔌 **REST API Base URL**: [http://localhost:8080/api](http://localhost:8080/api)

---

### 3. Running the Next.js Frontend (Optional)
```bash
npm install
npm run dev
```
- 🌐 **Frontend URL**: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Default Test Accounts

| Role | Username | Password | JSP Portal | Next.js Portal |
|---|---|---|---|---|
| **Admin** | `admin` | `123` | [http://localhost:8080/admin/dashboard](http://localhost:8080/admin/dashboard) | [/admin](http://localhost:3000/admin) |
| **Receptionist** | `staff` | `123` | [http://localhost:8080/receptionist/dashboard](http://localhost:8080/receptionist/dashboard) | [/receptionist](http://localhost:3000/receptionist) |
| **Guest** | `new_guest` | `123` | [http://localhost:8080/guest/dashboard](http://localhost:8080/guest/dashboard) | [/dashboard](http://localhost:3000/dashboard) |

---

## 📁 Project Structure

```
clg_project/
├── backend/                                   # Java Enterprise Spring Boot Backend
│   ├── pom.xml                                # Maven Dependencies (Hibernate, MySQL, JSP, Swagger)
│   ├── run.bat & run.sh                       # Quick startup scripts
│   └── src/main/
│       ├── java/com/hotel/management/
│       │   ├── HotelManagementApplication.java# Main Application Class
│       │   ├── config/                        # WebMvc, CORS, DataInitializer
│       │   ├── model/                         # Hibernate JPA Entities (Room, Booking, User, Staff, ServiceRequest, CheckInRecord, Payment)
│       │   ├── repository/                    # Spring Data JPA Repositories
│       │   ├── service/                       # Business Logic Layer
│       │   └── controller/
│       │       ├── api/                       # REST API Controllers (/api/rooms, /api/bookings, etc.)
│       │       └── jsp/                       # JSP Page Controllers (Home, Guest, Receptionist, Admin)
│       ├── resources/
│       │   └── application.properties         # Hibernate & MySQL Configuration
│       └── webapp/WEB-INF/jsp/                # JavaServer Pages (JSP) Views
│           ├── common/                        # header.jsp, navbar.jsp, footer.jsp
│           ├── auth/                          # login.jsp, register.jsp
│           ├── guest/                         # dashboard.jsp, rooms.jsp, bookings.jsp, services.jsp, invoice.jsp
│           ├── receptionist/                  # dashboard.jsp (Check-in/out, Room status monitor)
│           └── admin/                         # dashboard.jsp (Metrics, Rooms, Staff, Bookings, Users)
├── hotel_management_db.sql                    # Complete MySQL database schema & seed data
├── src/                                       # Next.js 16 Frontend
└── package.json                               # Frontend scripts
```

---

## 🔌 Complete REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/rooms` | `GET` | Get all rooms or filter by status |
| `/api/rooms/{id}` | `GET` | Get room details by ID |
| `/api/rooms` | `POST` | Create new hotel room |
| `/api/rooms/{id}` | `PUT` | Update room information |
| `/api/rooms/{id}/status` | `PATCH` | Update room availability status |
| `/api/rooms/{id}` | `DELETE` | Remove room from inventory |
| `/api/bookings` | `GET` | List bookings (optional `userId` filter) |
| `/api/bookings` | `POST` | Create booking reservation |
| `/api/bookings/{id}/status` | `PATCH` | Update reservation status |
| `/api/users/login` | `POST` | Authenticate user credentials |
| `/api/users/register` | `POST` | Register new guest account |
| `/api/staff` | `GET` / `POST` | Staff directory management |
| `/api/services` | `GET` / `POST` | Guest service requests tracking |
| `/api/checkin/process` | `POST` | Front desk guest check-in |
| `/api/checkin/checkout/{id}` | `POST` | Front desk guest check-out |

---

## 🌟 Advanced Features
- **Hibernate ORM Mapping**: Full entity relationships (`@ManyToOne`, `@OneToMany`), lifecycle event hooks (`@PrePersist`, `@PreUpdate`), and cascading.
- **HikariCP Connection Pool**: High-performance database connection management.
- **Dual Presentation Layer**: Use server-rendered JSP views directly or connect via headless REST APIs.
- **OpenAPI & Swagger UI**: Integrated test bench at `/swagger-ui.html`.
- **Printable Invoices**: Built-in formatted invoice generation for guest bookings.
