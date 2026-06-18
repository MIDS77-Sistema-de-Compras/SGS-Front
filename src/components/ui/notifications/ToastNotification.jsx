"use client";

export default function ToastNotification({ notification, setNotification }) {
    if (!notification) return null;

    return (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-white shadow-lg transition-all ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
            <div className="flex items-center gap-3">
                <span>{notification.message}</span>
                <button onClick={() => setNotification(null)} className="hover:opacity-80 font-bold ml-2">✕</button>
            </div>
        </div>
    );
}