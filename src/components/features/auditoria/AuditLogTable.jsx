import { levelStyles } from "./auditData";

const columns = ["ID", "Usuário", "Nível", "Tipo", "Usuário Afetado", "Solicitação", "Timestamp"];

function SortIcon() {
    return <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="inline ml-1 opacity-40" aria-hidden="true"><path d="M5 1L8 4H2L5 1Z" fill="currentColor" /><path d="M5 9L2 6H8L5 9Z" fill="currentColor" /></svg>;
}

function LevelBadge({ level }) {
    const style = levelStyles[level];
    return <span className="inline-block px-3 py-1 rounded-full text-[12px] font-bold whitespace-nowrap" style={{ color: style.color, backgroundColor: style.background }}>{level}</span>;
}

export default function AuditLogTable({ logs }) {
    return (
        <div className="min-w-[860px]">
            <div className="grid grid-cols-[60px_1fr_110px_100px_1fr_110px_110px] gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50/50 text-[13px] font-semibold text-gray-500">
                {columns.map((column, index) => <span key={column}>{column}{[0, 1, 2, 3, 6].includes(index) && <SortIcon />}</span>)}
            </div>
            <div className="flex flex-col flex-1">
                {logs.map((log, index) => <div key={log.id} className={`grid grid-cols-[60px_1fr_110px_100px_1fr_110px_110px] gap-2 px-6 py-3 items-center text-[13px] border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <span className="text-gray-700 font-medium">{log.id}</span>
                    <span className="text-gray-600 whitespace-pre-line leading-tight">{log.user}</span>
                    <span><LevelBadge level={log.level} /></span>
                    <span className="text-gray-600 whitespace-pre-line leading-tight">{log.action}</span>
                    <span className="text-gray-500 whitespace-pre-line leading-tight">{log.affectedUser}</span>
                    <span className="text-gray-500">{log.request}</span>
                    <span className="text-gray-400 whitespace-pre-line leading-tight">{log.timestamp}</span>
                </div>)}
                {logs.length === 0 && <p className="px-6 py-8 text-center text-sm text-gray-500">Nenhum registro encontrado.</p>}
            </div>
        </div>
    );
}
