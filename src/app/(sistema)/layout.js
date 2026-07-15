import Topbar from "@/components/layout/topbar/Topbar";
import Sidebar from "@/components/layout/sidebar/index";
import ImpersonationBanner from "@/components/layout/ImpersonationBanner";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-[#1A2233]">
            <ImpersonationBanner />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0 mx-20 mb-20">
                    <Topbar />
                    <main className="flex-1 flex flex-col mt-7 min-h-0 overflow-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}