"use client"

import React from "react";
import { Input } from "../login/Input";

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
        if (index >= strengthScore) return 'bg-gray-200'
        return 'bg-[#103D85]'
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
        <div className="md:col-span-2">
            <label className="block text-[12px] font-bold text-[#103D85]/70 mb-2 mt-4">
                Senha <span className="text-[#BA1A1A]">*</span>
            </label>

            <Input
                type="password"
                placeholder="Insira uma senha padrão"
                value={value || ''}
                onChange={onChange}
                className="!h-auto !px-3 !py-2.5 !border !border-gray-200 !shadow-sm !rounded-xl !text-sm !placeholder-[#6B7280] focus:!border-[#103D85] focus:!ring-0.5 focus:!ring-[#103D85]"
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
            <span className="text-[10px] text-gray-500 block pt-1.5 font-semibold">
                {strengthLabels[strengthScore]}
            </span>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-3">
                {criteria.map((criterion, index) => {
                    const isMet = criterion.test(value);
                    let textColor = "text-gray-400"; 

                    if (isMet) {
                        textColor = "text-[#34A853]"; 
                    } else if (error) {
                        textColor = "text-[#EA4335]"; 
                    }

                    return (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <span className="text-gray-300 text-[10px] select-none">•</span>
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

        </div>
    )
}