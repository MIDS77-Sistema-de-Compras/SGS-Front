// src/contexts/NotificationContext.jsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '@/components/notifications/Toast';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // Função para adicionar uma nova notificação na pilha
    const showNotification = useCallback((message, type = 'success') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
    }, []);

    // Função para remover da tela
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