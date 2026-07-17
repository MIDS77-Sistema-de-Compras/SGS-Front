import AdminSummaryItem from "./AdminSummaryItem";
import AdminAlertItem from "./AdminAlertItem";

export default function AdminSummaryCard({ title, items = [], alertCount }) {

    return (
        <div className="min-w-0 flex-1 border border-gray-100 dark:border-white/10 rounded-xl px-4 sm:px-5 py-4 sm:py-3 shadow-sm dark:bg-[#1A2233]">
            <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[18px] sm:text-[22px]">
                {title}
            </h2>
            <div className="border-t border-gray-100 dark:border-white/10 mt-2 -mx-4 sm:-mx-5" />

            <ul className="flex flex-col gap-5 mt-3">
                <AdminAlertItem count={alertCount} />
                <AdminSummaryItem {...items[0]} />
                <AdminSummaryItem {...items[1]} />
            </ul>
        </div>
    );
}