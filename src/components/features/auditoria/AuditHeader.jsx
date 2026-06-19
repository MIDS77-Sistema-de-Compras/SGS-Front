import Image from "next/image";

export default function AuditHeader() {
    return (
        <>
            <header className="flex w-full mt-4 gap-6 items-center">
                <Image src="/images/logos/sgs-blue.png" alt="Logo SGS" width={115} height={50} priority />
                <h1 className="text-[24px] font-semibold text-[#103D85]">Sistema de Gestão de Solicitações</h1>
            </header>

            <div>
                <h2 className="text-[28px] font-bold text-[#103D85]">Auditoria</h2>
                <p className="text-[14px] text-gray-500">Monitore e acompanhe as ações realizadas no sistema</p>
            </div>
        </>
    );
}
