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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    )}
                </button>
            )}
            
        </div>
    )
}