import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:3001';

interface Room {
    id: string;
    type: string;
    price: number;
    status: string;
    amenities: string[];
}

interface RoomState {
    items: Room[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// 1. Fetch Rooms from Mock Backend
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    const response = await axios.get(`${API_BASE}/rooms`);
    return response.data;
});

// 2. Book a Room (Update status on server)
export const bookRoom = createAsyncThunk('rooms/bookRoom', async (roomId: string) => {
    const response = await axios.patch(`${API_BASE}/rooms/${roomId}`, {
        status: 'Occupied'
    });
    return response.data;
});

export const checkOutRoom = createAsyncThunk('rooms/checkOutRoom', async (roomId: string) => {
    const response = await axios.patch(`${API_BASE}/rooms/${roomId}`, {
        status: 'Available'
    });
    return response.data;
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        items: [] as Room[],
        status: 'idle',
        error: null,
    } as RoomState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error loading rooms';
            })
            .addCase(bookRoom.fulfilled, (state, action) => {
                // Update the room status in our local state automatically
                const index = state.items.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(checkOutRoom.fulfilled, (state, action) => {
                const index = state.items.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default roomSlice.reducer;