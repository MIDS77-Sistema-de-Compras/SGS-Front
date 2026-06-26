export default function AuditPagination({ currentPage, totalPages, totalRecords, pageSize, onPageChange }) {
    const firstRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const lastRecord = Math.min(currentPage * pageSize, totalRecords);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <footer className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <p className="text-[12px] text-gray-400 mr-auto">Mostrando {firstRecord} a {lastRecord} de {totalRecords} logs</p>
            <button type="button" aria-label="Primeira página" onClick={() => onPageChange(1)} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors">«</button>
            <button type="button" aria-label="Página anterior" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors">‹</button>
            {pages.map((page) => <button type="button" key={page} onClick={() => onPageChange(page)} aria-current={currentPage === page ? "page" : undefined} className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${currentPage === page ? "bg-[#103D85] text-white" : "border border-gray-300 text-gray-500 hover:bg-gray-100"}`}>{page}</button>)}
            <button type="button" aria-label="Próxima página" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors">›</button>
            <button type="button" aria-label="Última página" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-30 text-[12px] transition-colors">»</button>
        </footer>
    );
}
