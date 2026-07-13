"use client";

import { X } from "lucide-react";
import LevelBadge from "./LevelBadge";

export default function AuditDetailsModal({ open, onClose, data }) {

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white dark:bg-[#1A2233] shadow-xl border border-gray-100 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 px-8 py-4">
          <h2 className="text-xl font-bold text-[#0B2C66] dark:text-[#E2E2EA]">
            Informações do Registro
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-[#C3C6D3]" />
          </button>
        </div>

        <div className="space-y-6 p-8">
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400 dark:text-[#C3C6D3]">RESUMO</p>

            <div className="rounded-lg bg-gray-50 dark:bg-[#303746] p-4 text-sm text-gray-700 dark:text-[#E2E2EA]">
                O usuário <strong>{data.user}</strong>, com o ID{" "}
                <strong>{data.id}</strong>, com nível de acesso{" "}
                <LevelBadge level={data.level} />, realizou a ação de{" "}
                <strong>{data.action}</strong> no sistema.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    ID DO REGISTRO
                </p>
                <p className="text-[#002B5C] dark:text-[#E2E2EA] font-semibold">{data.id}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    USUÁRIO EXECUTOR
                </p>
                <p className="text-[#002B5C] dark:text-[#E2E2EA] font-semibold">{data.user}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    NÍVEL DE ACESSO
                </p>

              <LevelBadge level={data.level} />
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    TIPO DE AÇÃO
                </p>
                <p className="text-[#002B5C] dark:text-[#E2E2EA] font-semibold">{data.action}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    USUÁRIO AFETADO
                </p>
                <p className="text-[#002B5C] dark:text-[#E2E2EA] font-semibold">{data.affectedUser}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    SOLICITAÇÃO
                </p>
                <p className="text-[#002B5C] dark:text-[#E2E2EA] font-semibold">{data.request}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-[#C3C6D3] uppercase">
                    TIMESTAMP
                </p>
                <p className="text-[#002B5C] dark:text-[#E2E2EA] font-semibold">{data.timestamp}</p>
            </div>
        </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400 dark:text-[#C3C6D3]">
              DESCRIÇÃO
            </p>

            <div className="rounded-lg border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#303746] p-4 text-sm text-gray-500 dark:text-[#C3C6D3] italic">
              {data.description ||
                "Nenhuma descrição adicional fornecida para este registro de auditoria."}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 dark:border-white/10 px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 dark:bg-[#303746] px-6 py-2 font-medium text-gray-700 dark:text-[#E2E2EA] transition-colors hover:bg-gray-300 dark:hover:bg-white/5"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}