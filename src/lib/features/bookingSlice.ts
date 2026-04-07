import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

interface Booking {
    id: string;
    roomId: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    status: 'Confirmed' | 'CheckedIn' | 'CheckedOut';
}

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    const response = await axios.get(`${API_BASE}/bookings`);
    return response.data;
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (booking: Omit<Booking, 'id'>) => {
    const response = await axios.post(`${API_BASE}/bookings`, booking);
    return response.data;
});

export const updateBookingStatus = createAsyncThunk('bookings/updateBookingStatus', async ({ id, status }: { id: string, status: string }) => {
    const response = await axios.patch(`${API_BASE}/bookings/${id}`, { status });
    return response.data;
});

const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        items: [] as Booking[],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default bookingSlice.reducer;
