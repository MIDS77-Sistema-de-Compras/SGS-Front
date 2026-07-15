export default function StatCard({ title, value, icon: Icon, iconColor, iconBg }) {
    return (
        <div className="bg-white dark:bg-[#303746] rounded-xl shadow-sm border border-gray-100 dark:border-white/10 p-3 sm:p-4 flex items-center gap-3">
            <div className={`p-2.5 sm:p-3 rounded-xl ${iconBg} ${iconColor}`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
                <p className="text-[13px] sm:text-sm text-gray-500 dark:text-[#C3C6D3] font-medium">{title}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-[#E2E2EA]">{value}</p>
            </div>
        </div>
    )
}