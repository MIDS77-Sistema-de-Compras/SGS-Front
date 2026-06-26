function AuditStatIcon({ type, color }) {
    const iconProps = { stroke: color, strokeWidth: "1.5", strokeLinecap: "round" };

    if (type === "calendar") {
        return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2" {...iconProps} /><path d="M16 2V6M8 2V6M3 10H21" {...iconProps} /><rect x="7" y="13" width="3" height="3" rx="0.5" fill={color} /></svg>;
    }

    if (type === "login") {
        return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="7" r="3.5" {...iconProps} /><path d="M2 20V17.5C2 15.57 3.57 14 5.5 14H12.5" {...iconProps} /><circle cx="18" cy="17" r="4" {...iconProps} /><path d="M18 15V17.5L19.5 19" {...iconProps} /></svg>;
    }

    if (type === "alert") {
        return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L3 7V12C3 17.25 6.75 22.04 12 23C17.25 22.04 21 17.25 21 12V7L12 2Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" /><path d="M12 8V14" stroke={color} strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="17" r="1.2" fill={color} /></svg>;
    }

    return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15" {...iconProps} /><rect x="9" y="3" width="6" height="4" rx="1" {...iconProps} /><path d="M9 12H15M9 16H13" {...iconProps} /></svg>;
}

function AuditSummaryCard({ stat }) {
    return (
        <div className="relative flex items-center gap-4 flex-1 rounded-xl border border-gray-200 shadow-sm px-5 py-5 overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style={{ backgroundColor: stat.color }} />
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.background }}>
                <AuditStatIcon type={stat.icon} color={stat.color} />
            </div>
            <div>
                <p className="text-[13px] text-gray-400 leading-tight">{stat.label}</p>
                <p className="text-[32px] font-bold text-gray-800 leading-tight">{stat.value}</p>
            </div>
        </div>
    );
}

export default function AuditSummaryCards({ stats }) {
    return <section className="flex gap-5" aria-label="Resumo da auditoria">{stats.map((stat) => <AuditSummaryCard key={stat.id} stat={stat} />)}</section>;
}
