/**
 * API Configuration
 * 
 * To use a Mock API (e.g. MockAPI.io or JSON Server on Render/Heroku):
 * 1. Set NEXT_PUBLIC_API_BASE_URL in your Vercel Environment Variables.
 * 2. If no variable is set, it defaults to the Render server.
 * 3. On localhost, you can set it to http://localhost:3000/api to use db.json.
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const REMOTE_BASE_URL = 'https://hotel-db-server-kiiv.onrender.com';

export const API_BASE_URL = 
    process.env.NEXT_PUBLIC_API_BASE_URL || 
    (isDevelopment ? '/api' : REMOTE_BASE_URL);

export const ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    ROOMS: `${API_BASE_URL}/rooms`,
    BOOKINGS: `${API_BASE_URL}/bookings`,
    STAFF: `${API_BASE_URL}/staff`,
    SERVICES: `${API_BASE_URL}/services`,
};

export const REMOTE_ENDPOINTS = {
    USERS: `${REMOTE_BASE_URL}/users`,
    ROOMS: `${REMOTE_BASE_URL}/rooms`,
    BOOKINGS: `${REMOTE_BASE_URL}/bookings`,
    STAFF: `${REMOTE_BASE_URL}/staff`,
    SERVICES: `${REMOTE_BASE_URL}/services`,
};
