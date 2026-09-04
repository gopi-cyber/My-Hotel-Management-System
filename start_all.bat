@echo off
title LuxeStay - Master Launcher
echo ========================================================
echo   LuxeStay Hotel Management System - Master Launcher
echo   Launching Backend (Port 8080) and Frontend (Port 3000)...
echo ========================================================
cd /d "%~dp0"

echo [1/2] Launching Java Spring Boot Backend (Port 8080)...
start "LuxeStay Backend (Spring Boot + JSP)" cmd /k "cd /d %~dp0backend && run.bat"

timeout /t 2 >nul

echo [2/2] Launching Next.js Frontend (Port 3000)...
start "LuxeStay Frontend (Next.js)" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================================
echo   Services are running!
echo   - Backend (JSP Web & REST API): http://localhost:8080
echo   - API Documentation (Swagger):   http://localhost:8080/swagger-ui.html
echo   - Frontend (Next.js):            http://localhost:3000
echo ========================================================
pause
