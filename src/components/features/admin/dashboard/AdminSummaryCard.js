import AdminSummaryItem from "./AdminSummaryItem";
import AdminAlertItem from "./AdminAlertItem";

export default function AdminSummaryCard({ title, items = [], alertCount, variant = "default" }) {
    const isUsers = variant === "users";

    return (
        <section className="flex-1 overflow-hidden rounded-xl border border-[#AAAAAA] bg-white shadow-sm">
            <h2 className="border-b border-[#AAAAAA] px-4 py-2 text-[20px] font-bold text-[#103D85]">{title}</h2>
            <div className="grid min-h-[160px] grid-cols-2 grid-rows-2 gap-3 p-3">
                {isUsers ? <><AdminSummaryItem {...items[0]} /><AdminSummaryItem {...items[1]} /><AdminSummaryItem {...items[2]} /></> : <><AdminSummaryItem {...items[0]} /><AdminAlertItem count={alertCount} /><AdminSummaryItem {...items[1]} /></>}
            </div>
        </section>
    );
}