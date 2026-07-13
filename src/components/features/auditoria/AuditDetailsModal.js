"use client";

import { X } from "lucide-react";
import LevelBadge from "./LevelBadge";

export default function AuditDetailsModal({ open, onClose, data }) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-8 py-6">
          <h2 className="text-xl font-bold text-[#0B2C66]">
            INFORMAÇÕES DO REGISTRO
          </h2>

          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6 p-8">
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400">RESUMO</p>

            <div className="rounded-lg bg-gray-50 p-4 text-sm">
                O usuário <strong>{data.user}</strong>, com o ID{" "}
                <strong>{data.id}</strong>, com nível de acesso{" "}
                <LevelBadge level={data.level} />, realizou a ação de{" "}
                <strong>{data.action}</strong> no sistema.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    ID DO REGISTRO
                </p>
                <p className="text-[#002B5C] font-semibold">{data.id}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    USUÁRIO EXECUTOR
                </p>
                <p className="text-[#002B5C] font-semibold">{data.user}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    NÍVEL DE ACESSO
                </p>

              <LevelBadge level={data.level} />
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    TIPO DE AÇÃO
                </p>
                <p className="text-[#002B5C] font-semibold">{data.action}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    USUÁRIO AFETADO
                </p>
                <p className="text-[#002B5C] font-semibold">{data.affectedUser}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    SOLICITAÇÃO
                </p>
                <p className="text-[#002B5C] font-semibold">{data.request}</p>
            </div>

            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase">
                    TIMESTAMP
                </p>
                <p className="text-[#002B5C] font-semibold">{data.timestamp}</p>
            </div>
        </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-400">
              DESCRIÇÃO
            </p>

            <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-500 italic">
              {data.description ||
                "Nenhuma descrição adicional fornecida para este registro de auditoria."}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-6 py-2 font-medium hover:bg-gray-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}