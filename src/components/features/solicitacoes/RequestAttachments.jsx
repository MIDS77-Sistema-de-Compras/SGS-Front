"use client";

import { useState } from "react";
import { Download, Eye, File, Paperclip } from "lucide-react";

function formatFileSize(size) {
  const bytes = Number(size);
  if (!Number.isFinite(bytes) || bytes < 0) return "Tamanho não informado";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}

function formatUploadDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getSafeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function getDownloadName(attachment) {
  const originalName = attachment.originalName?.split(/[\\/]/).pop();
  return originalName || `anexo-${attachment.id || "solicitacao"}`;
}

export default function RequestAttachments({ attachments = [], onError }) {
  const [downloadingId, setDownloadingId] = useState(null);

  if (!attachments.length) return null;

  const handlePreview = (attachment) => {
    const url = getSafeUrl(attachment.url);
    if (!url) {
      onError?.("O endereço deste anexo é inválido.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (attachment) => {
    const url = getSafeUrl(attachment.url);
    if (!url) {
      onError?.("O endereço deste anexo é inválido.");
      return;
    }

    setDownloadingId(attachment.id ?? url);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Não foi possível baixar o anexo.");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = getDownloadName(attachment);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      onError?.("Não foi possível baixar o anexo. Tente visualizá-lo em uma nova aba.");
    } finally {
      setDownloadingId(null);
    }
  };

  const renderActions = (attachment, isDownloading) => (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => handlePreview(attachment)}
        className="inline-flex items-center gap-2 rounded-lg border border-[#103D85] px-3 py-1.5 text-xs font-semibold text-[#103D85] transition-colors hover:bg-[#103D85]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103D85] dark:border-[#5D8EF7] dark:text-[#5D8EF7] dark:hover:bg-[#5D8EF7]/10"
        aria-label={`Visualizar ${getDownloadName(attachment)}`}
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
        <span>Visualizar</span>
      </button>
      <button
        type="button"
        onClick={() => handleDownload(attachment)}
        disabled={isDownloading}
        className="inline-flex items-center gap-2 rounded-lg bg-[#103D85] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0c2f66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#103D85] disabled:cursor-wait disabled:opacity-50 dark:bg-[#1A4A9E] dark:hover:bg-[#2456b0]"
        aria-label={`Baixar ${getDownloadName(attachment)}`}
      >
        <Download className={`h-4 w-4 ${isDownloading ? "animate-pulse" : ""}`} aria-hidden="true" />
        <span>{isDownloading ? "Baixando" : "Baixar"}</span>
      </button>
    </div>
  );

  return (
    <section className="w-full border-t border-gray-100 px-4 pb-6 pt-5 dark:border-white/10 sm:px-5" aria-labelledby="request-attachments-title">
      <div className="mb-3 flex items-center gap-2 px-1">
        <Paperclip className="h-5 w-5 text-[#103D85] dark:text-[#5D8EF7]" aria-hidden="true" />
        <h5 id="request-attachments-title" className="font-bold text-gray-900 dark:text-[#E2E2EA]">
          Anexos ({attachments.length})
        </h5>
      </div>

      <div className="flex w-full flex-col gap-3">
        {attachments.map((attachment, index) => {
          const itemId = attachment.id ?? attachment.url ?? index;
          const isDownloading = downloadingId === (attachment.id ?? getSafeUrl(attachment.url));
          const uploadDate = formatUploadDate(attachment.uploadedAt);

          return (
            <article
              key={itemId}
              className="flex w-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-[#103D85]/20 hover:bg-gray-50/50 dark:border-white/10 dark:bg-[#303746] dark:hover:border-[#5D8EF7]/30 dark:hover:bg-white/5 lg:flex-row lg:items-center lg:gap-5"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#103D85]/10 text-[#103D85] dark:bg-[#5D8EF7]/10 dark:text-[#5D8EF7]">
                  <File className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800 dark:text-[#E2E2EA]" title={getDownloadName(attachment)}>
                    {getDownloadName(attachment)}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-[#C3C6D3]">
                    {formatFileSize(attachment.size)}{uploadDate ? ` • Enviado em ${uploadDate}` : ""}
                  </p>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-100 pt-3 dark:border-white/10 lg:mt-0 lg:border-0 lg:pt-0">
                {renderActions(attachment, isDownloading)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
