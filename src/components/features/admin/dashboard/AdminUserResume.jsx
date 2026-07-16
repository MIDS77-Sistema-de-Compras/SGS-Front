import AdminSummaryItem from "./AdminSummaryItem";

export default function AdminUserResume({ items }) {
    return (
        <div className="w-full lg:w-[360px] min-[1350px]:w-[430px] lg:shrink-0 border border-gray-100 dark:border-white/10 rounded-xl px-4 sm:px-5 py-4 sm:py-3 shadow-sm dark:bg-[#1A2233]">
            <div className="flex justify-between mb-5 sm:mb-7">
                <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[18px] sm:text-[22px]">
                    Resumo Usuários
                </h2>
            </div>

            <ul className="flex flex-col gap-5">
                <AdminSummaryItem {...items[0]} />
                <AdminSummaryItem {...items[1]} />
                <AdminSummaryItem {...items[2]} />
            </ul>
        </div>
    )
}