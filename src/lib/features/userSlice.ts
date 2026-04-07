import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
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

// Simulation of a local database
const MOCK_USERS: User[] = [
    { id: '1', username: 'admin', password: '123', role: 'admin', name: 'Admin User' },
    { id: '2', username: 'reception', password: '123', role: 'receptionist', name: 'Receptionist User' },
    { id: '3', username: 'guest', password: '123', role: 'guest', name: 'Guest User' }
];

export const registerUser = createAsyncThunk('user/registerUser', async (userData: Omit<User, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = { ...userData, id: Math.random().toString(36).substr(2, 9) };
    return newUser;
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials: { username: string, password?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = MOCK_USERS.find(u => u.username === credentials.username && u.password === credentials.password);
    if (user) {
        return user;
    }
    throw new Error('Invalid username or password');
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
    } as UserState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Login failed';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
