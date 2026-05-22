import Image from "next/image";
import { useState } from "react";

export function Input({
    type = "text", placeholder, value, onChange, className = "", iconSrc, iconAlt = "Ícone" }) {

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const tipoAtual = type === "password" && mostrarSenha ? "text" : type;

    return (

        <div className=" relative flex items-center w-full">

            {iconSrc && (
                <div className="absolute left-4">
                    <Image src={iconSrc} alt={iconAlt} width={24} height={24} className="opacity-60" />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
                h-14 rounded-xl px-4 bg-white text-lg w-full
                outline-none border border-transparent focus:border-[#5D8EF7] 
                transition-all text-gray-800 ${className}
                ${iconSrc ? "pl-14 pr-4" : "px-4"}  
                    ${className}
            `}
            />
            {type === "password" && (
                <button
                    type="button" // IMPORTANTE: type="button" para não enviar o formulário ao clicar no olho
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-4 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center"
                ></button>
                {mostrarSenha ? (
        </div>
    )
}