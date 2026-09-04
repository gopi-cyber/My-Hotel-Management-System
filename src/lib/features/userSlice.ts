import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    id: string;
    username: string;
    email?: string;
    password?: string;
    role: string;
    name?: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
}

import { ENDPOINTS } from '../apiConfig';

const API_URL = ENDPOINTS.USERS;

export const registerUser = createAsyncThunk('user/registerUser', async (userData: Omit<User, 'id'>) => {
    // Check for duplicate username first
    const checkResponse = await axios.get(`${API_URL}?username=${userData.username}`);
    if (checkResponse.data.length > 0) {
        throw new Error('This username is already taken. Please choose another one.');
    }
    
    const response = await axios.post(API_URL, userData);
    return response.data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials: { username: string, password?: string }) => {
    try {
        const response = await axios.post(API_URL, { action: 'login', ...credentials });
        const authenticatedUser = { ...response.data, role: response.data.role.toLowerCase() };
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('vortex_user', JSON.stringify(authenticatedUser));
        }
        return authenticatedUser;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || err.message || 'Login service currently unavailable');
        }
        throw new Error(err instanceof Error ? err.message : 'Login service currently unavailable');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
    } as UserState,
    reducers: {
        restoreSession: (state, action: { payload: User }) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            if (typeof window !== 'undefined') sessionStorage.removeItem('vortex_user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state) => {
                // We don't necessarily log them in immediately if the user wants redirect to login first
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message || 'Registration failed. Check if server is running.';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Login failed';
            });
    },
});

export const { logout, restoreSession } = userSlice.actions;
export default userSlice.reducer;
