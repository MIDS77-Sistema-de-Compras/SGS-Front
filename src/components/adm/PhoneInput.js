import Image from 'next/image';
import { Input } from '@/components/login/Input';

export default function PhoneInput({ placeholder }) {
    return (
        <div className="flex rounded-xl border border-gray-200 shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
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
                className="!h-auto !py-2.5 !text-sm !border-gray-200 !rounded-xl !shadow-sm"
            />
        </div>
    )
}