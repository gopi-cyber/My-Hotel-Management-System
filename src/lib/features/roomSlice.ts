import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Room {
    id: string;
    type: string;
    price: number;
    status: string;
    amenities: string[];
    image?: string;
    floor?: number;
    description?: string;
}

interface RoomState {
    items: Room[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Mock Data
const MOCK_ROOMS: Room[] = [
    { id: '101', type: 'Deluxe Ocean View', price: 299, status: 'Available', amenities: ['WiFi', 'Mini Bar', 'Ocean View'], image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800', floor: 1, description: 'Breathtaking ocean views with premium amenities.' },
    { id: '102', type: 'Presidential Suite', price: 899, status: 'Occupied', amenities: ['WiFi', 'Kitchen', 'Private Pool', 'Butler Service'], image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', floor: 10, description: 'The pinnacle of luxury with private pool and butler service.' },
    { id: '201', type: 'Executive Suite', price: 499, status: 'Available', amenities: ['WiFi', 'Office Desk', 'City View'], image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', floor: 2, description: 'Perfect for business travelers with a dedicated office desk.' },
    { id: '202', type: 'Family Room', price: 349, status: 'Available', amenities: ['WiFi', '2 Queen Beds', 'Play Area'], image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800', floor: 2, description: 'Spacious room with a play area for children.' },
];

// 1. Fetch Rooms Simulation
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROOMS;
});

// 2. Room CRUD Simulations
export const addRoom = createAsyncThunk('rooms/addRoom', async (room: Omit<Room, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...room, id: 'r' + Math.random().toString(36).substr(2, 5) };
});

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (room: Room) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return room;
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (roomId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return roomId;
});

export const bookRoom = createAsyncThunk('rooms/bookRoom', async (roomId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: roomId, status: 'Occupied' };
});

export const checkOutRoom = createAsyncThunk('rooms/checkOutRoom', async (roomId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id: roomId, status: 'Available' };
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        items: MOCK_ROOMS as Room[], // Initialize with mock data
        status: 'succeeded',
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
            .addCase(addRoom.fulfilled, (state, action) => {
                console.log('Room Added:', action.payload);
                state.items.push(action.payload as any);
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                console.log('Room Updated:', action.payload);
                const index = state.items.findIndex(room => room.id === (action.payload as any).id);
                if (index !== -1) {
                    state.items[index] = action.payload as any;
                }
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                console.log('Room Deleted:', action.payload);
                state.items = state.items.filter(room => String(room.id) !== String(action.payload));
            })
            .addCase(bookRoom.fulfilled, (state, action) => {
                const index = state.items.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].status = action.payload.status;
                }
            })
            .addCase(checkOutRoom.fulfilled, (state, action) => {
                const index = state.items.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].status = action.payload.status;
                }
            });
    },
});

export default roomSlice.reducer;