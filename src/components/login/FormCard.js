import Image from "next/image";

export default function FormCard({
    onSubmit,
    showBackLink = false,
    backHref = "/login",
    children,
}) {
    return (

        <form
            onSubmit={onSubmit}
            className="w-[580px] h-[580px] bg-[#0A2E6B] rounded-[24px] px-10 pt-12 pb-8 flex flex-col shadow-2xl border border-white/5"
        >
            {showBackLink && (
                <a
                    href={backHref}
                    className="flex items-center gap-1 text-white/60 hover:text-white text-xs mb-6 w-fit transition-colors"
                >
                    <span>&#8592;</span>
                    <span>Voltar para login</span>
                </a>
            )}

            <div className="mb-10">
                <Image
                    src="/images/logos/sgcLogo.png"
                    alt="SGS"
                    width={110}
                    height={110}
                    className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                />
            </div>

            {children}

            <div className="flex justify-between text-[11px] text-white/60 underline mt-auto">
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-white transition-colors">Políticas de privacidade</a>
            </div>
        </form>


    )
}