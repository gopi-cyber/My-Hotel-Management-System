'use client';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
import { restoreSession, User } from './features/userSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const [store] = useState(makeStore);

    useEffect(() => {
        const saved = sessionStorage.getItem('vortex_user');
        if (!saved) return;
        try {
            store.dispatch(restoreSession(JSON.parse(saved) as User));
        } catch {
            sessionStorage.removeItem('vortex_user');
        }
    }, [store]);

    return <Provider store={store}>{children}</Provider>;
}
