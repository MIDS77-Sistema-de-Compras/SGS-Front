"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    darkMode: false,
    setDarkMode: () => {},
    toggleTheme: () => {},
    mounted: false,
});

function getInitialTheme() {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(getInitialTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}