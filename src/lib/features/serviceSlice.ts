import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface ServiceRequest {
  id: string;
  guestId: string;
  roomId: string;
  serviceName: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt?: string;
  completedAt?: string;
}

interface ServiceState {
  items: ServiceRequest[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

import { ENDPOINTS } from '../apiConfig';

const API_URL = ENDPOINTS.SERVICES;

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

export const fetchUserServices = createAsyncThunk(
  'services/fetchUserServices',
  async (guestId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}?guestId=${guestId}`);
      if (!response.ok) throw new Error('Failed to fetch user services');
      return response.json();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (service: Omit<ServiceRequest, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });
      if (!response.ok) throw new Error('Failed to create service request');
      return response.json();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async (data: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const { id, ...updates } = data;
      const url = API_URL.startsWith('/api') ? API_URL : `${API_URL}/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(API_URL.startsWith('/api') ? data : updates),
      });
      if (!response.ok) throw new Error('Failed to update service');
      return response.json();
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  } as ServiceState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchUserServices.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearError } = serviceSlice.actions;
export default serviceSlice.reducer;
