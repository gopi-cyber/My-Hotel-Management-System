import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Staff {
    id: string;
    name: string;
    email: string;
    role: 'Management' | 'Receptionist' | 'Housekeeping';
    shift: 'Morning' | 'Afternoon' | 'Night';
    status: 'Active' | 'On Leave' | 'Inactive';
    createdAt?: string;
}

interface StaffState {
    items: Staff[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// API Thunks
export const fetchStaff = createAsyncThunk(
    'staff/fetchStaff',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/staff');
            if (!response.ok) throw new Error('Failed to fetch staff');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const addStaff = createAsyncThunk(
    'staff/addStaff',
    async (staff: Omit<Staff, 'id' | 'createdAt'>, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/staff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(staff),
            });
            if (!response.ok) throw new Error('Failed to add staff');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async (staff: Staff, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/staff', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(staff),
            });
            if (!response.ok) throw new Error('Failed to update staff');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/staff?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete staff');
            return id;
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    } as StaffState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addStaff.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export const { clearError } = staffSlice.actions;
export default staffSlice.reducer;
