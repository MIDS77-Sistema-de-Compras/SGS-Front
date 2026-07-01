export default function StatCard({ title, value, icon: Icon, iconColor, iconBg }) {
    return (
        <div className="rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
            <div className={`p-3 rounded-xl ${iconBg} ${iconColor}`}>
                <Icon size={28} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    )
}