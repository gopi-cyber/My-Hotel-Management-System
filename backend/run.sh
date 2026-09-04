#!/bin/bash
echo "==================================================="
echo " LuxeStay Hotel Management Backend"
echo " Spring Boot 3 + Hibernate + MySQL + JSP"
echo "==================================================="
cd "$(dirname "$0")"

if command -v mvn &> /dev/null; then
    echo "[INFO] Starting Spring Boot with Maven..."
    mvn spring-boot:run
elif [ -f "./mvnw" ]; then
    echo "[INFO] Starting Spring Boot with Maven Wrapper..."
    chmod +x ./mvnw
    ./mvnw spring-boot:run
else
    echo "[ERROR] Maven is not installed in PATH. Please install Maven or run via your Java IDE."
    exit 1
fi
