import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './features/roomSlice';
import bookingReducer from './features/bookingSlice';
import userReducer from './features/userSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            rooms: roomReducer,
            bookings: bookingReducer,
            user: userReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];