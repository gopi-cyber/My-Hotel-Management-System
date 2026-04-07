import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Booking {
    id: string;
    roomId: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    status: 'Confirmed' | 'CheckedIn' | 'CheckedOut';
}

// Memory-based mock storage for bookings
let MOCK_BOOKINGS: Booking[] = [
    { id: 'b1', roomId: '102', guestName: 'John Doe', checkIn: '2026-04-01', checkOut: '2026-04-05', status: 'CheckedIn' }
];

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...MOCK_BOOKINGS];
});

export const addBooking = createAsyncThunk('bookings/addBooking', async (booking: Omit<Booking, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newBooking = { ...booking, id: 'b' + Math.random().toString(36).substr(2, 5) };
    MOCK_BOOKINGS.push(newBooking);
    return newBooking;
});

export const updateBookingStatus = createAsyncThunk('bookings/updateBookingStatus', async ({ id, status }: { id: string, status: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_BOOKINGS.findIndex(b => b.id === id);
    if (index !== -1) {
        MOCK_BOOKINGS[index] = { ...MOCK_BOOKINGS[index], status: status as any };
        return MOCK_BOOKINGS[index];
    }
    throw new Error('Booking not found');
});

const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        items: MOCK_BOOKINGS as Booking[],
        status: 'succeeded',
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
