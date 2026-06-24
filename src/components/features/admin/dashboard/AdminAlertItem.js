export default function AdminAlertItem({ count = 5 }) {
    return (
        <article className="relative row-span-2 flex items-center justify-center gap-4 overflow-hidden rounded-lg border border-red-200 bg-white px-3 py-3 shadow-md">
            <div className="absolute left-2 right-2 top-0 h-[3px] rounded-b-full bg-red-500" />
            <div className="flex min-w-0 flex-col gap-2"><p className="whitespace-nowrap text-[14px] font-bold leading-tight text-red-600">ALERTAS CRÍTICOS</p><div className="flex items-center gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#F79BA4]"><svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4L6 14V24C6 34.5 13.5 44.08 24 46C34.5 44.08 42 34.5 42 24V14L24 4Z" stroke="#DC2626" strokeWidth="2" strokeLinejoin="round" /><path d="M24 16V28" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" /><circle cx="24" cy="35" r="2" fill="#DC2626" /></svg></div><p className="text-[60px] font-extrabold leading-none text-black">{count}</p></div></div>
        </article>
    );
}