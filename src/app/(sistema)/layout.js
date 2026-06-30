import Topbar from "@/components/layout/topbar/Topbar";
import Sidebar from "@/components/layout/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden bg-white dark:bg-[#1A2233]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 mx-20 mb-20">
                <Topbar />
                <main className="flex-1 flex flex-col mt-4 min-h-0 overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}