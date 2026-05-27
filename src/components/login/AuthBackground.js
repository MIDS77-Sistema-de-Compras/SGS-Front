import Image from "next/image";


export default function AuthLayout({
    title = "Sistema de Gestão \n de Solicitações",
    greeting = "Olá,\nBem-vindo(a) ao",
    children,
}) {
    const greetingLines = greeting.split("\n");
    const titleLines = title.split("\n");

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#002663] via-[#003C97] to-[#4B84F4] flex items-center justify-between px-16 lg:px-28 relative py-12">

            <div className="flex flex-col justify-between h-[580px] max-w-[800px]">
                <div className="text-white mt-10">
                    {greetingLines.map((line, i) => (<p key={i} className="text-4xl font-light tracking-wide mt-1">
                        {line}
                    </p>
                    ))}
                    <h1 className="text-5xl font-bold leading-tight mt-4">
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
                        src="/images/logos/senaiLogo.png"
                        alt="Logo SENAI"
                        width={140}
                        height={35}
                        className="object-contain w-auto h-auto"
                    />
                    <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                        <Image
                            src="/images/logos/facebookLogo.png"
                            alt="Facebook"
                            width={18}
                            height={18}
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/youtubeLogo.png"
                            alt="YouTube"
                            width={18}
                            height={18}
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/xLogo.png"
                            alt="X"
                            width={16}
                            height={16}
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/linkedinLogo.png"
                            alt="LinkedIn"
                            width={18}
                            height={18}
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                        />
                        <Image
                            src="/images/logos/instagramLogo.png"
                            alt="Instagram"
                            width={18}
                            height={18}
                            className="w-auto h-auto opacity-90 hover:opacity-100 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {children}
        </main>
    )

}