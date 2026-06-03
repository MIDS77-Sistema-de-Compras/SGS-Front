import AdminSummaryItem from "./AdminSummaryItem"
import AdminAlertItem from "./AdminAlertItem"

export default function AdminSummaryCard({ title, items = [], alertCount, variant = "default" }) {
    return (
        <div className="flex-1 border border-[#AAAAAA] rounded-xl p-5 shadow-lg bg-white">
            <h2 className="text-[#103D85] font-bold text-[20px] mb-5">
                {title}
            </h2>

            {variant === "users" && (
                <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[220px]">
                    {items.map((item, index) => (
                        <AdminSummaryItem key={index} {...item} />
                    ))}
                </div>
            )}

            {variant === "records" && (
                <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[220px]">
                    {items[0] && <AdminSummaryItem {...items[0]} />}
                    <AdminAlertItem count={alertCount} />
                    {items[1] && <AdminSummaryItem {...items[1]} />}
                </div>
            )}
        </div>
    )
}
