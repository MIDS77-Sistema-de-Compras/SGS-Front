"use client"

import FormField from "@/components/ui/form/FormField";
import { PasswordInput } from "@/components/ui/input/PasswordInput";

export default function PasswordField({ value, onChange, error, ...rest }) {

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

    const strengthScore = calculateStrength(value)
    const getBarColor = (index) => {
        if (index >= strengthScore) return 'bg-gray-200'

        return 'bg-[#103D85]'
    }
    const strengthLabels = ['Nível de força', 'Muito Fraca', 'Razoável', 'Boa', 'Forte']

    return (
        <FormField label="Senha" required className="md:col-span-2">
            <PasswordInput
                variant="form"
                placeholder="Mínimo 8 caracteres"
                value={value}
                onChange={onChange}
                error={error}
                {...rest}
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
        </FormField>
    )
}
