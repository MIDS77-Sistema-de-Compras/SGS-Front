"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/overlay/Modal";
import Button from "@/components/ui/button/Button";

const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const DEFAULT_COLOR = "#103D85";

export default function AddStatusModal({ isOpen, onClose, onConfirm, isLoading }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState(DEFAULT_COLOR);
    const [erro, setErro] = useState("");

    const reset = () => {
        setName("");
        setColor(DEFAULT_COLOR);
        setErro("");
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleConfirm = () => {
        if (!name.trim()) {
            setErro("O nome do status é obrigatório.");
            return;
        }

        if (!HEX_PATTERN.test(color)) {
            setErro("Escolha uma cor válida.");
            return;
        }

        onConfirm({ name: name.trim(), color });
        reset();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Adicionar status" height="h-auto" maxWidth="max-w-[420px]">
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block">
                    Nome do status
                </label>
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ex.: Aguardando peça"
                    maxLength={25}
                    className="w-full border border-gray-300 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#103D85] dark:focus:ring-[#1A4A9E]"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block">
                    Cor
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                        className="h-10 w-14 shrink-0 cursor-pointer rounded-lg border border-gray-300 dark:border-white/15 bg-transparent p-1"
                        aria-label="Selecionar cor do status"
                    />
                    <input
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
                        placeholder="#103D85"
                        maxLength={7}
                        className="flex-1 border border-gray-300 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#103D85] dark:focus:ring-[#1A4A9E]"
                    />
                </div>
            </div>

            {erro && <p className="text-xs font-medium text-[#BA1A1A] dark:text-[#F87171]">{erro}</p>}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <Button variant="outline" fullWidth className="sm:w-auto" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    fullWidth
                    className="sm:w-auto"
                    isLoading={isLoading}
                    onClick={handleConfirm}
                >
                    Criar status
                </Button>
            </div>
        </Modal>
    );
}
