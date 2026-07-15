export default function SettingsCard({ icon, title, description, action, children }) {
    return (
        <section className="bg-white dark:bg-[#303746] rounded-xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden transition-all">
            <div className="p-4 sm:p-8 flex items-center justify-between gap-3 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 dark:text-[#C3C6D3] border border-gray-100 dark:border-white/10 shrink-0">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-sm sm:text-lg font-bold text-gray-800 dark:text-[#E2E2EA]">{title}</h3>
                        <p className="text-gray-400 dark:text-[#C3C6D3] text-[10px] sm:text-sm leading-tight">{description}</p>
                    </div>
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </div>
            {children && (
                <div className="border-t border-gray-100 dark:border-white/10">
                    {children}
                </div>
            )}
        </section>
    );
}