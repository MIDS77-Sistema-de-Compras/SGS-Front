import Image from "next/image"
import Link from "next/link"

export default function AdminFooter() {
    return (
        <footer className="flex gap-10 mt-auto">
            <Link
                href="/usuarios"
                className="flex flex-1 rounded-xl bg-[#103D85] py-4 px-10 gap-3 items-center justify-center shadow-lg transition-all active:scale-[0.98] hover:bg-[#3366cc]"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.5"/>
                    <path d="M2 21V18C2 15.79 3.79 14 6 14H12C14.21 14 16 15.79 16 18V21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="19" cy="9" r="3" stroke="white" strokeWidth="1.5"/>
                    <path d="M19 15C20.66 15 22 16.34 22 18V21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-white font-bold">
                    Gerenciar Usuários
                </p>
            </Link>

            <Link
                href="/usuarios/cadastro"
                className="flex flex-1 rounded-xl border border-[#AAAAAA] py-4 px-10 gap-3 justify-center items-center shadow-lg transition-all active:scale-[0.98] hover:bg-gray-100 bg-white"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="9" y="3" width="6" height="4" rx="1" stroke="#333" strokeWidth="1.5"/>
                    <path d="M9 12H15" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 16H13" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="font-bold text-gray-800">
                    Análise de Registros
                </p>
            </Link>
        </footer>
    )
}
