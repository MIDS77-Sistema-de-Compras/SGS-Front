import Topbar from "@/components/topbar/Topbar";
import Sidebar from "@/components/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 mx-20 mb-20">
                <Topbar />
                <main className="flex-1 flex flex-col mt-10 min-h-0">
                    {children}
                </main>
            </div>
        </div>
    )
}