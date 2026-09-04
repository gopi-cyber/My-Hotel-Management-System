import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Booking {
    id: string;
    roomId: string;
    guestId: string;
    guestName: string;
    roomNumber?: string;
    roomType?: string;
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

import { ENDPOINTS } from '../apiConfig';

const API_URL = ENDPOINTS.BOOKINGS;

const normalizeStatus = (value: unknown): Booking['status'] =>
    String(value ?? 'pending').toLowerCase() as Booking['status'];

const normalizeBooking = (booking: Record<string, unknown>): Booking => ({
    id: String(booking.id ?? booking.bookingReference ?? ''),
    roomId: String(booking.roomId ?? ''),
    guestId: String(booking.guestId ?? booking.userId ?? ''),
    guestName: String(booking.guestName ?? 'Guest'),
    roomNumber: booking.roomNumber ? String(booking.roomNumber) : undefined,
    roomType: booking.roomType ? String(booking.roomType) : undefined,
    checkInDate: String(booking.checkInDate ?? ''),
    checkOutDate: String(booking.checkOutDate ?? ''),
    totalPrice: Number(booking.totalPrice ?? booking.totalAmount ?? 0),
    status: normalizeStatus(booking.status),
    nights: Number(booking.nights ?? 0),
    createdAt: booking.createdAt ? String(booking.createdAt) : undefined,
    checkedInTime: booking.checkedInTime ? String(booking.checkedInTime) : undefined,
    checkedOutTime: booking.checkedOutTime ? String(booking.checkedOutTime) : undefined,
});

// API Thunks
export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch bookings');
            const data = await response.json();
            return (Array.isArray(data) ? data : []).map(normalizeBooking);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const fetchUserBookings = createAsyncThunk(
    'bookings/fetchUserBookings',
    async (userId: string, { rejectWithValue }) => {
        try {
            const url = API_URL.startsWith('/api') ? `${API_URL}?userId=${userId}` : `${API_URL}?guestId=${userId}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch user bookings');
            const data = await response.json();
            return (Array.isArray(data) ? data : []).map(normalizeBooking);
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const addBooking = createAsyncThunk(
    'bookings/addBooking',
    async (booking: Omit<Booking, 'id' | 'createdAt'>, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
            if (!response.ok) throw new Error('Failed to create booking');
            return normalizeBooking(await response.json());
        } catch (error: unknown) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const updateBooking = createAsyncThunk(
    'bookings/updateBooking',
    async (booking: Booking, { rejectWithValue }) => {
        try {
            const { id, ...updates } = booking;
            const url = API_URL.startsWith('/api') ? API_URL : `${API_URL}/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(API_URL.startsWith('/api') ? booking : updates),
            });
            if (!response.ok) throw new Error('Failed to update booking');
            return normalizeBooking(await response.json());
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
