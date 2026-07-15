import Topbar from "@/components/layout/topbar/Topbar";
import Sidebar from "@/components/layout/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="min-h-screen lg:h-screen flex lg:overflow-hidden bg-white dark:bg-[#1A2233]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 px-4 sm:px-8 lg:px-12 min-[1350px]:px-20 pt-20 lg:pt-0 pb-8 lg:pb-16 min-[1350px]:pb-20">
                <Topbar />
                <main className="flex-1 flex flex-col mt-5 sm:mt-7 min-h-0 lg:overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}