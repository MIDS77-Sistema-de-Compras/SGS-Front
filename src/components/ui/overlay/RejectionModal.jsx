import { useState } from "react";
import { Modal } from "@/components/ui/overlay/Modal";
import Button from "@/components/ui/button/Button";

export default function RejectionModal({ isOpen, onClose, onConfirm, isLoading, title, description }) {
  const [justificativa, setJustificativa] = useState("");
  const [erro, setErro] = useState("");

  const handleClose = () => {
    setJustificativa("");
    setErro("");
    onClose();
  };

  const handleConfirm = () => {
    if (!justificativa.trim()) {
      setErro("A justificativa é obrigatória para recusar.");
      return;
    }
    onConfirm(justificativa.trim());
    setJustificativa("");
    setErro("");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title} height="h-auto" maxWidth="max-w-[480px]">
      <p className="text-sm text-gray-600 dark:text-[#C3C6D3]">{description}</p>

      <textarea
        value={justificativa}
        onChange={(e) => setJustificativa(e.target.value)}
        rows={4}
        placeholder="Descreva o motivo da recusa..."
        className="w-full border border-gray-300 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-xl p-3 text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#103D85] dark:focus:ring-[#1A4A9E]"
      />

      {erro && <p className="text-xs font-medium text-[#BA1A1A] dark:text-[#F87171]">{erro}</p>}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <Button variant="outline" fullWidth className="sm:w-auto" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          fullWidth
          className="sm:w-auto rounded-full"
          isLoading={isLoading}
          onClick={handleConfirm}
        >
          Confirmar recusa
        </Button>
      </div>
    </Modal>
  );
}