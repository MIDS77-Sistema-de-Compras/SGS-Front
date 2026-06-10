'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '@/components/notifications/Toast';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'success') => {
        setNotifications((prev) => {
            const existingIndex = prev.findIndex((n) => n.message === message)
            
            if(existingIndex !== -1) {
                const updated = [...prev]
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    id: Date.now(),
                    type
                };
                return updated;
            }
            return [...prev, { id: Date.now(), message, type }]
        });
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
                {notifications.map((notification) => (
                    <div key={notification.id} className="pointer-events-auto">
                        <Toast
                            message={notification.message}
                            type={notification.type}
                            onClose={() => removeNotification(notification.id)}
                        />
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification deve ser usado dentro de um NotificationProvider');
    }
    return context;
}