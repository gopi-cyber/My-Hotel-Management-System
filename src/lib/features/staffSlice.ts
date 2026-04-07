import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Staff {
    id: string;
    name: string;
    role: 'Receptionist' | 'Housekeeping' | 'Management';
    status: 'Active' | 'On Leave' | 'Inactive';
    email: string;
}

const MOCK_STAFF: Staff[] = [
    { id: 's1', name: 'Alice Johnson', role: 'Receptionist', status: 'Active', email: 'alice@hotel.com' },
    { id: 's2', name: 'Bob Smith', role: 'Housekeeping', status: 'Active', email: 'bob@hotel.com' },
    { id: 's3', name: 'Charlie Davis', role: 'Receptionist', status: 'On Leave', email: 'charlie@hotel.com' },
];

export const fetchStaff = createAsyncThunk('staff/fetchStaff', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...MOCK_STAFF];
});

export const addStaff = createAsyncThunk('staff/addStaff', async (staff: Omit<Staff, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...staff, id: 's' + Math.random().toString(36).substr(2, 5) };
});

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        items: MOCK_STAFF,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addStaff.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default staffSlice.reducer;
