export default function SettingsCard({ icon, title, description, action, children }) {
    return (
        <section className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden transition-all">
            <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 border border-gray-100">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                        <p className="text-gray-400 text-sm">{description}</p>
                    </div>
                </div>
                {action && <div>{action}</div>}
            </div>
            {children && (
                <div className="border-t border-gray-100">
                    {children}
                </div>
            )}
        </section>
    );
}