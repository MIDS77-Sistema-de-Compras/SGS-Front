import React, { useState } from "react";
import { Input } from "../login/Input";

export default function PasswordField() {
    const [password, setPassword] = useState('')

    const calculateStrength = (pwd) => {
        let score = 0
        if (!pwd) return 0

        if (pwd.length >= 8) score += 1
        if (/[A-Z]/.test(pwd)) score += 1
        if (/[0-9]/.test(pwd)) score += 1
        if (/[a-z]/.test(pwd)) score += 1
        if (/[\W]/.test(pwd)) score += 1

        return score
    }

    const strengthScore = calculateStrength(password)

    const getBarColor = (index) => {
        if (index >= strengthScore) return 'bg-gray-200'

        return 'bg-[#103D85]'
    }
    const strengthLabels = ['Nível de força', 'Muito Fraca', 'Razoável', 'Boa', 'Forte']

    return (
        <div className="md:col-span-2">
            <label className="block text-[12px] font-bold text-[#103D85]/70 mb-2">
                Senha <span className="text-[#BA1A1A]">*</span>
            </label>

            <Input 
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!h-auto !px-3 !py-2.5 !border !border-gray-200 !shadow-sm !rounded-xl !text-sm !placeholder-[#6B7280]"
            />

            <div className="flex gap-3 pt-5">
                {[0, 1, 2, 3, 4].map((index) => (
                    <div 
                        key={index}
                        className={`h-2 w-1/4 rounded transition-colors duration-300 ${getBarColor(index)}`}
                    />
                ))}
            </div>

            <span className="text-[10px] text-gray-500 block pt-2 font-medium">
                {strengthLabels[strengthScore]}
            </span>
        </div>
    )
}