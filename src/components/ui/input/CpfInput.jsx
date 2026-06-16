"use client";

import { useState } from "react";
import { getInputClassName } from "./inputVariants";

function formatCpf(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function CpfInput({ value, onChange, readOnly = false, variant = "form", error, className = "" }) {
    const [display, setDisplay] = useState(value ? formatCpf(value) : "");

    const handleChange = (e) => {
        const formatted = formatCpf(e.target.value);
        setDisplay(formatted);
        if (onChange) onChange(formatted);
    };

    return (
        <input
            type="text"
            value={display}
            onChange={handleChange}
            readOnly={readOnly}
            placeholder="000.000.000-00"
            className={getInputClassName({ variant, error, hasRightSlot: false, className })}
        />
    );
}