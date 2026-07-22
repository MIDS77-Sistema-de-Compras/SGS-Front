import Image from "next/image";

export default function Topbar() {
    return (
        <div className="hidden lg:flex w-full mt-8 gap-6 min-[1350px]:gap-10 items-center">
            <div className="relative w-[100px] min-[1350px]:w-[120px] h-[50px] shrink-0">
                <Image
                    src="/images/logos/sgs-blue.png"
                    alt="Logo SGS"
                    fill
                    sizes="120px"
                    className="block dark:hidden object-contain object-left"
                />
                <Image
                    src="/images/logos/sgc.png"
                    alt="Logo SGS"
                    fill
                    sizes="120px"
                    className="hidden dark:block object-contain object-left"
                />
            </div>
            <h1 className="text-[20px] min-[1350px]:text-[24px] font-semibold text-[#103D85] dark:text-[#E2E2EA]">
                Sistema de Gestão de Solicitações
            </h1>
        </div>
    )
}