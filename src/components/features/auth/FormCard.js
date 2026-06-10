import Image from "next/image";
import Link from "next/link";

export default function FormCard({
    onSubmit,
    showBackLink = false,
    onTermosClick,
    onPoliticasClick,
    children,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="w-[580px] h-[580px] bg-[#0A2E6B] rounded-[24px] px-10 pt-12 pb-8 flex flex-col shadow-2xl border border-white/5"
        >
            {showBackLink && (
                <Link
                    href="/login"
                    className="flex items-center gap-1 text-white/60 hover:text-white text-xs mb-6 w-fit transition-colors"
                >
                    <span>&#8592;</span>
                    <span>Voltar para login</span>
                </Link>
            )}

            <div className="mb-10">
                <Image
                    src="/images/logos/sgc.png"
                    alt="SGS"
                    width={110}
                    height={110}
                    className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                />
            </div>

            {children}

            <div className="flex justify-between text-[11px] text-white/60 underline mt-auto">
                <button
                    type="button"
                    onClick={onTermosClick}
                    className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                    Termos de Uso
                </button>
                <button
                    type="button"
                    onClick={onPoliticasClick}
                    className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                    Políticas de privacidade
                </button>
            </div>
        </form>
    )
}