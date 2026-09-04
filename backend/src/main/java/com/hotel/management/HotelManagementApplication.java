package com.hotel.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class HotelManagementApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HotelManagementApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(HotelManagementApplication.class, args);
        System.out.println("\n========================================================");
        System.out.println("🏨 LuxeStay Hotel Management Backend (Spring Boot + Hibernate + MySQL + JSP)");
        System.out.println("🌐 Web Application (JSP): http://localhost:8080");
        System.out.println("📄 Swagger API Docs:      http://localhost:8080/swagger-ui.html");
        System.out.println("🔌 REST API Base URL:     http://localhost:8080/api");
        System.out.println("========================================================\n");
    }
}
