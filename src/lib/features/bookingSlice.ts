import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Booking {
    id: string;
    roomId: string;
    guestId: string;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
    nights: number;
    createdAt?: string;
    checkedInTime?: string;
    checkedOutTime?: string;
}

interface BookingState {
    items: Booking[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// API Thunks
export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/bookings');
            if (!response.ok) throw new Error('Failed to fetch bookings');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const fetchUserBookings = createAsyncThunk(
    'bookings/fetchUserBookings',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/bookings?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch user bookings');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const addBooking = createAsyncThunk(
    'bookings/addBooking',
    async (booking: Omit<Booking, 'id' | 'createdAt'>, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
            if (!response.ok) throw new Error('Failed to create booking');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const updateBooking = createAsyncThunk(
    'bookings/updateBooking',
    async (booking: Booking, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/bookings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
            if (!response.ok) throw new Error('Failed to update booking');
            return response.json();
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    } as BookingState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                const index = state.items.findIndex((b) => b.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export const { clearError } = bookingSlice.actions;
export default bookingSlice.reducer;
