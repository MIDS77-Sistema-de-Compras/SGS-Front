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
            className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[540px] min-[1350px]:max-w-[580px] h-auto lg:min-h-[520px] min-[1350px]:min-h-[580px] shrink-0 bg-[#0A2E6B] rounded-2xl sm:rounded-[24px] px-5 py-7 sm:px-8 sm:pt-10 sm:pb-8 min-[1350px]:px-10 min-[1350px]:pt-12 min-[1350px]:pb-8 flex flex-col shadow-2xl border border-white/5"
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

            <div className="mb-6 sm:mb-8 min-[1350px]:mb-10 flex justify-center sm:justify-start">
                <Image
                    src="/images/logos/sgc.png"
                    alt="SGS"
                    width={110}
                    height={110}
                    className="w-auto h-auto max-sm:h-8 max-sm:w-auto opacity-90 hover:opacity-100 cursor-pointer"
                />
            </div>

            {children}

            <div className="flex justify-between gap-4 text-[11px] text-white/60 underline mt-10 lg:mt-auto">
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