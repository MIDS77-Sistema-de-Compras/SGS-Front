"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import RequestForm from "@/components/features/request-form/RequestForm";
import RequestDetailsSkeleton from "@/components/features/solicitacoes/RequestDetailsSkeleton";
import { useRequestDetails } from "@/hooks/useRequestDetails";
import { isRequestEditable } from "@/lib/utils/requestStatus";
import { getUserRole } from "@/lib/utils/getUserRole";

export default function EditRequestPage({ ownRequest = false, backBase = "/solicitacoes" }) {
    const { id } = useParams();
    const router = useRouter();
    const { request, loading, error } = useRequestDetails(id, { ownRequest });
    const backHref = `${backBase}/${id}`;
    const currentRole = (getUserRole() || "").replace(/^ROLE_/, "");
    const hasEditorRole = ["DOCENTE", "SUPERVISOR", "COORDENADOR"].includes(currentRole);

    if (loading) return <RequestDetailsSkeleton />;

    if (error || !request) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                    <p className="mb-4 text-gray-500 dark:text-[#C3C6D3]">
                        {error || "Solicitação não encontrada."}
                    </p>
                    <Link href={backHref} className="text-[#103D85] dark:text-[#5D8EF7] underline">
                        Voltar
                    </Link>
                </div>
            </div>
        );
    }

    if (!isRequestEditable(request.status) || !hasEditorRole) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="max-w-lg rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-[#1A2233]">
                    <h1 className="mb-2 text-xl font-bold text-[#103D85] dark:text-[#E2E2EA]">
                        Solicitação não editável
                    </h1>
                    <p className="mb-5 text-sm text-gray-600 dark:text-[#C3C6D3]">
                        Esta solicitação já passou pela análise e não pode mais ser alterada.
                    </p>
                    <Link href={backHref} className="font-semibold text-[#103D85] dark:text-[#5D8EF7] underline">
                        Voltar aos detalhes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 min-h-0 flex-col gap-4">
            <Link href={backHref} className="inline-flex w-fit items-center gap-2 font-semibold text-[#103D85] dark:text-[#5D8EF7]">
                <span aria-hidden="true">←</span> Voltar aos detalhes
            </Link>
            <RequestForm
                initialRequest={request}
                onSaved={() => router.push(backHref)}
            />
        </div>
    );
}
