@echo off
title LuxeStay Hotel Management System
:menu
cls
echo ========================================================
echo   🏨 LUXESTAY HOTEL MANAGEMENT SYSTEM
echo ========================================================
echo.
echo   [1] Start ALL Services (Java Backend + Next.js Frontend)
echo   [2] Start Java Backend Only (Spring Boot + JSP + MySQL on Port 8080)
echo   [3] Start Next.js Frontend Only (Port 3000)
echo   [4] Open MySQL Database Schema file (database/hotel_management_db.sql)
echo   [5] Open Documentation (docs/)
echo   [6] Exit
echo.
echo ========================================================
set /p choice="Select an option (1-6): "

if "%choice%"=="1" goto start_all
if "%choice%"=="2" goto start_backend
if "%choice%"=="3" goto start_frontend
if "%choice%"=="4" goto open_db
if "%choice%"=="5" goto open_docs
if "%choice%"=="6" goto end

echo Invalid selection! Please enter 1-6.
timeout /t 2 >nul
goto menu

:start_all
call start_all.bat
goto menu

:start_backend
call start_backend.bat
goto menu

:start_frontend
call start_frontend.bat
goto menu

:open_db
start notepad "%~dp0database\hotel_management_db.sql"
goto menu

:open_docs
start explorer "%~dp0docs"
goto menu

:end
exit
