"use client";

import Image from 'next/image';

import { Input } from '@/components/login/Input';

export default function PhoneInput({ placeholder, value, onChange }) {

    return (
        <div className="flex rounded-xl border border-gray-200 shadow-sm overflow-hidden focus-within:border-[#103D85] focus-within:ring-0.5 focus-within:ring-[#103D85]">
            <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-200 text-gray-400 text-sm">
                <Image
                    src="/images/adm/telefone.png"
                    alt="Ícone de telefone"
                    width={4}
                    height={4}
                    className='w-auto h-auto'
                />
            </div>
            <Input
                placeholder={placeholder}
                className={`!h-auto py-2.5 !text-sm !bg-white !border-0 !shadow-none !ring-0 focus:!ring-0 focus:!border-0`}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}