import AdminSummaryItem from "./AdminSummaryItem";

export default function AdminUserResume({ items }) {
    return (
        <div className="w-[430px] shrink-0 border border-[#AAAAAA] dark:border-white/10 rounded-xl px-5 py-3 shadow-lg dark:bg-[#1A2233]">
            <div className="flex justify-between mb-7">
                <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">
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