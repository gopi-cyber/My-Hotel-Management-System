@echo off
title LuxeStay Hotel Management - Spring Boot Backend
echo ===================================================
echo  LuxeStay Hotel Management Backend
echo  Spring Boot 3 + Hibernate + MySQL + JSP
echo ===================================================
cd /d "%~dp0"

if "%DB_PASSWORD%"=="" (
    echo [ERROR] DB_PASSWORD is not set.
    echo Run: set DB_PASSWORD=your_mysql_password
    echo Then launch this file again.
    pause
    exit /b 1
)

where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Found Maven in PATH. Starting Spring Boot application...
    mvn spring-boot:run
) else (
    echo [INFO] Maven not in PATH. Attempting with Maven Wrapper or direct run...
    if exist mvnw.cmd (
        call mvnw.cmd spring-boot:run
    ) else (
        echo [ERROR] Please install Apache Maven and add it to your PATH, or run with your preferred Java IDE (IntelliJ, Eclipse, VS Code).
        pause
    )
)
