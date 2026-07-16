"use client";

import { useEffect, useState } from "react";
import { UserCog, LogOut } from "lucide-react";
import { getImpersonationStatus, stopImpersonation } from "@/service/auth/auth-impersonate";

/**
 * Aviso global exibido quando um administrador está logado na conta
 * de outro usuário. Permite voltar para a conta original.
 */
export default function ImpersonationBanner() {
    const [status, setStatus] = useState(null);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const data = await getImpersonationStatus();
            if (!cancelled) setStatus(data);
        })();

        return () => { cancelled = true; };
    }, []);

    async function handleStop() {
        setIsLeaving(true);

        try {
            await stopImpersonation();
            window.location.assign("/usuarios/gerenciar");
        } catch (e) {
            console.error("Erro ao voltar para a conta do administrador: ", e);
            setIsLeaving(false);
        }
    }

    if (!status?.impersonating) return null;

    return (
        <div className="w-full bg-amber-50 dark:bg-amber-500/15 border-b border-amber-200 dark:border-amber-500/30 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
                <UserCog size={16} className="shrink-0" />
                <span>
                    Você está logado como{" "}
                    <strong className="font-semibold">{status.userName}</strong>.
                    As ações serão registradas em nome do administrador{" "}
                    <strong className="font-semibold">{status.adminName}</strong>.
                </span>
            </div>

            <button
                onClick={handleStop}
                disabled={isLeaving}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/30 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
                <LogOut size={14} />
                {isLeaving ? "Voltando..." : "Voltar para minha conta"}
            </button>
        </div>
    );
}
