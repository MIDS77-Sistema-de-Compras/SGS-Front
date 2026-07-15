import { levelStyles, defaultLevelStyle } from "./auditData";

const columns = ["ID", "Usuário", "Nível", "Tipo", "Descrição", "Usuário Afetado", "Solicitação", "Timestamp"];

const GRID_TEMPLATE = "grid-cols-[60px_1fr_110px_120px_1.4fr_1fr_100px_110px]";

function SortIcon() {
    return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline ml-1 opacity-40" aria-hidden="true"><path d="M5 1L8 4H2L5 1Z" fill="currentColor" /><path d="M5 9L2 6H8L5 9Z" fill="currentColor" /></svg>;
}

function formatLevelLabel(level) {
    if (!level) return "—";
    if (level.toUpperCase() === "ADMIN") return "ADM";

    return level
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function LevelBadge({ level }) {
    const label = formatLevelLabel(level);
    const style = levelStyles[label] || defaultLevelStyle;
    return <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold whitespace-nowrap" style={{ color: style.color, backgroundColor: style.background }}>{label}</span>;
}

export default function AuditLogTable({ logs }) {
    return (
        <div className="min-w-[1020px]">
            <div className={`grid ${GRID_TEMPLATE} gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50/50 text-[13px] font-semibold text-gray-500`}>
                {columns.map((column, index) => <span key={column}>{column}{[0, 1, 2, 3, 7].includes(index) && <SortIcon />}</span>)}
            </div>
            <div className="flex flex-col flex-1">
                {logs.map((log, index) => <div key={log.id} className={`grid ${GRID_TEMPLATE} gap-2 px-6 py-3 items-center text-[13px] border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <span className="text-gray-700 font-medium">{log.id}</span>
                    <span className="text-gray-600 whitespace-pre-line leading-tight">{log.user}</span>
                    <span><LevelBadge level={log.level} /></span>
                    <span className="text-gray-600 whitespace-pre-line leading-tight">{log.action}</span>
                    <span className="text-gray-500 leading-tight">{log.description}</span>
                    <span className="text-gray-500 whitespace-pre-line leading-tight">{log.affectedUser}</span>
                    <span className="text-gray-500">{log.request}</span>
                    <span className="text-gray-400 whitespace-pre-line leading-tight">{log.timestamp}</span>
                </div>)}
                {logs.length === 0 && <p className="px-6 py-8 text-center text-sm text-gray-500">Nenhum registro encontrado.</p>}
            </div>
        </div>
    );
}
