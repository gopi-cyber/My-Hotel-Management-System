/**
 * LuxeStay API Configuration
 * Connects directly to the Spring Boot + Hibernate + MySQL backend.
 */

export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    ROOMS: `${API_BASE_URL}/rooms`,
    BOOKINGS: `${API_BASE_URL}/bookings`,
    STAFF: `${API_BASE_URL}/staff`,
    SERVICES: `${API_BASE_URL}/services`,
    CHECKIN: `${API_BASE_URL}/checkin`,
};

export const BACKEND_ENDPOINTS = {
    USERS: `${BACKEND_BASE_URL}/users`,
    ROOMS: `${BACKEND_BASE_URL}/rooms`,
    BOOKINGS: `${BACKEND_BASE_URL}/bookings`,
    STAFF: `${BACKEND_BASE_URL}/staff`,
    SERVICES: `${BACKEND_BASE_URL}/services`,
    CHECKIN: `${BACKEND_BASE_URL}/checkin`,
};
