"use client"

import FormField from "@/components/ui/form/FormField";
import { PasswordInput } from "@/components/ui/input/PasswordInput";
import React from "react";

export default function PasswordField({ value, onChange, error, ...rest }) {

    const calculateStrength = (pwd) => {
        let score = 0
        if (!pwd) return 0

        if (pwd.length >= 8) score += 1
        if (/[A-Z]/.test(pwd)) score += 1
        if (/[a-z]/.test(pwd)) score += 1 
        if (/[0-9]/.test(pwd)) score += 1
        if (/[\W]/.test(pwd)) score += 1

        return score;
    }

    const strengthScore = calculateStrength(value)

    const getBarColor = (index) => {
        if (index >= strengthScore) return 'bg-gray-200 dark:bg-white/15'
        return 'bg-[#103D85] dark:bg-[#5D8EF7]'
    }

    const strengthLabels = ['Nível de força', 'Muito Fraca', 'Razoável', 'Boa', 'Forte']

    const criteria = [
        { label: 'Precisa de 8 caracteres', test: (pwd) => pwd?.length >= 8 },
        { label: 'Precisa de letra maiúscula', test: (pwd) => /[A-Z]/.test(pwd || '') },
        { label: 'Precisa de letra minúscula', test: (pwd) => /[a-z]/.test(pwd || '') }, 
        { label: 'Precisa de números', test: (pwd) => /[0-9]/.test(pwd || '') },
        { label: 'Precisa de caracteres especiais', test: (pwd) => /[\W]/.test(pwd || '') },
    ];

    return (
        <FormField label="Senha" required className="md:col-span-2">
            <PasswordInput
                variant="form"
                placeholder="Insira uma senha padrão"
                value={value}
                onChange={onChange}
                error={error}
                {...rest}
            />

            <div className="flex gap-1.5 pt-3">
                {[0, 1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`h-1.5 w-1/5 rounded-full transition-colors duration-300 ${getBarColor(index)}`}
                    />
                ))}
            </div>
            <span className="text-[10px] text-gray-500 dark:text-[#C3C6D3] block pt-1.5 font-semibold">
                {strengthLabels[strengthScore]}
            </span>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-3">
                {criteria.map((criterion, index) => {
                    const isMet = criterion.test(value);
                    let textColor = "text-gray-400 dark:text-[#C3C6D3]"; 

                    if (isMet) {
                        textColor = "text-[#34A853] dark:text-[#4ADE80]"; 
                    } else if (error) {
                        textColor = "text-[#EA4335] dark:text-[#F87171]"; 
                    }

                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <span className="text-gray-300 dark:text-white/30 text-[10px] select-none">•</span>
                            )}
                            
                            <span
                                className={`text-[11px] font-medium tracking-wide transition-colors duration-200 ${textColor}`}
                            >
                                {criterion.label}
                            </span>
                        </React.Fragment>
                    );
                })}
            </div>

        </FormField>
    )
}