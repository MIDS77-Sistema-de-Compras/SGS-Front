import Image from "next/image";


export default function AuthLayout({
    title = "Sistema de Gestão \n de Solicitações",
    greeting = "Olá,\nBem-vindo(a) ao",
    children,
}) {
    const greetingLines = greeting.split("\n");
    const titleLines = title.split("\n");

    return (
        <main className="force-light min-h-screen w-full bg-gradient-to-br from-[#002663] via-[#003C97] to-[#4B84F4] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-10 px-4 sm:px-10 lg:px-20 min-[1350px]:px-48 py-8 lg:py-12 relative">

            <div className="hidden sm:block lg:hidden w-full max-w-[480px] text-white">
                <p className="text-base font-light tracking-wide opacity-80">
                    {greetingLines.join(" ")}
                </p>
                <h1 className="text-2xl font-bold mt-1 leading-snug">
                    {titleLines.join(" ")}
                </h1>
            </div>

            <div className="hidden lg:flex flex-col justify-between lg:min-h-[520px] min-[1350px]:min-h-[580px] max-w-[800px] min-w-0">
                <div className="text-white mt-10">
                    {greetingLines.map((line, i) => (<p key={i} className="text-3xl min-[1350px]:text-4xl font-light tracking-wide mt-1">
                        {line}
                    </p>
                    ))}
                    <h1 className="text-4xl min-[1350px]:text-5xl font-bold leading-tight mt-4">
                        {titleLines.map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < title.split("\n").length - 1 && <br />}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className="flex items-center gap-6 mt-10">
                    <Image
                        src="/images/logos/senai-orange.png"
                        alt="Logo Senai"
                        width={180}
                        height={35}
                        className="object-contain w-[110px] h-auto min-[1350px]:w-[180px]"
                    />
                    <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                        <Image
                            src="/images/logos/facebook.png"
                            alt="Facebook"
                            width={17}
                            height={26}
                            className="w-[14px] h-[14px] min-[1350px]:w-[17px] min-[1350px]:h-[26px] opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/youtube.png"
                            alt="YouTube"
                            width={32}
                            height={32}
                            className="w-[14px] h-[14px] min-[1350px]:w-[32px] min-[1350px]:h-[32px] opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/x.png"
                            alt="X"
                            width={32}
                            height={32}
                            className="w-[13px] h-[13px] min-[1350px]:w-[32px] min-[1350px]:h-[32px] opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/linkedin.png"
                            alt="LinkedIn"
                            width={24}
                            height={23}
                            className="w-[14px] h-[14px] min-[1350px]:w-[24px] min-[1350px]:h-[23px] opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/instagram.png"
                            alt="Instagram"
                            width={24}
                            height={23}
                            className="w-[14px] h-[14px] min-[1350px]:w-[24px] min-[1350px]:h-[23px] opacity-90 hover:opacity-100 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {children}
        </main>
    )

}