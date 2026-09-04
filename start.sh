#!/bin/bash
# LuxeStay Hotel Management System Launcher

echo "========================================================"
echo "  🏨 LUXESTAY HOTEL MANAGEMENT SYSTEM"
echo "========================================================"
echo ""
echo "  [1] Start ALL Services (Java Backend + Next.js Frontend)"
echo "  [2] Start Java Backend Only (Spring Boot + JSP on Port 8080)"
echo "  [3] Start Next.js Frontend Only (Port 3000)"
echo "  [4] Exit"
echo ""
echo "========================================================"
read -p "Select an option (1-4): " choice

case $choice in
    1)
        echo "Starting Backend..."
        (cd backend && ./run.sh) &
        echo "Starting Frontend..."
        npm run dev
        ;;
    2)
        cd backend && ./run.sh
        ;;
    3)
        npm run dev
        ;;
    4)
        exit 0
        ;;
    *)
        echo "Invalid option."
        ;;
esac
