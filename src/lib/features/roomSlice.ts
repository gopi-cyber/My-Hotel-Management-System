import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Room {
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

// Mutable in-memory store — shared across admin and guest
let MOCK_ROOMS: Room[] = [
    { id: '101', type: 'Deluxe Ocean View', price: 299, status: 'Available', amenities: ['WiFi', 'Mini Bar', 'Ocean View'], image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800', floor: 1, description: 'Breathtaking ocean views with premium amenities.' },
    { id: '102', type: 'Presidential Suite', price: 899, status: 'Occupied', amenities: ['WiFi', 'Kitchen', 'Private Pool', 'Butler Service'], image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', floor: 10, description: 'The pinnacle of luxury with private pool and butler service.' },
    { id: '201', type: 'Executive Suite', price: 499, status: 'Available', amenities: ['WiFi', 'Office Desk', 'City View'], image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', floor: 2, description: 'Perfect for business travelers with a dedicated office desk.' },
    { id: '202', type: 'Family Room', price: 349, status: 'Available', amenities: ['WiFi', '2 Queen Beds', 'Play Area'], image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800', floor: 2, description: 'Spacious room with a play area for children.' },
];

// Async fetch — returns current mutable list
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...MOCK_ROOMS];
});

// Keep bookRoom and checkOutRoom as async thunks (used by guest booking flow)
export const bookRoom = createAsyncThunk('rooms/bookRoom', async (roomId: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const room = MOCK_ROOMS.find(r => r.id === roomId);
    if (room) room.status = 'Occupied';
    return { id: roomId, status: 'Occupied' };
});

export const checkOutRoom = createAsyncThunk('rooms/checkOutRoom', async (roomId: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const room = MOCK_ROOMS.find(r => r.id === roomId);
    if (room) room.status = 'Available';
    return { id: roomId, status: 'Available' };
});

const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        items: [...MOCK_ROOMS] as Room[],
        status: 'succeeded',
        error: null,
    } as RoomState,
    reducers: {
        // Synchronous add — instant UI update + persists in MOCK_ROOMS
        addRoomSync: (state, action: PayloadAction<Omit<Room, 'id'>>) => {
            const newRoom: Room = {
                ...action.payload,
                id: 'r' + Math.random().toString(36).substr(2, 6),
            };
            MOCK_ROOMS.push(newRoom);
            state.items.push(newRoom);
        },
        // Synchronous update — instantly reflects status/price/type changes
        updateRoomSync: (state, action: PayloadAction<Room>) => {
            const updatedRoom = action.payload;
            // Update Redux state
            const stateIdx = state.items.findIndex(r => r.id === updatedRoom.id);
            if (stateIdx !== -1) {
                state.items[stateIdx] = updatedRoom;
            }
            // Update the mutable store so guest sees the change too
            const mockIdx = MOCK_ROOMS.findIndex(r => r.id === updatedRoom.id);
            if (mockIdx !== -1) {
                MOCK_ROOMS[mockIdx] = updatedRoom;
            }
        },
        // Synchronous delete — removes from both Redux state and MOCK_ROOMS
        deleteRoomSync: (state, action: PayloadAction<string>) => {
            const roomId = action.payload;
            state.items = state.items.filter(r => r.id !== roomId);
            MOCK_ROOMS = MOCK_ROOMS.filter(r => r.id !== roomId);
        },
    },
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

export const { addRoomSync, updateRoomSync, deleteRoomSync } = roomSlice.actions;
export default roomSlice.reducer;