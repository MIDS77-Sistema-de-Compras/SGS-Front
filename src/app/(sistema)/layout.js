import Topbar from "@/components/topbar/Topbar";
import "../globals.css";
import Sidebar from "@/components/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex-col">
                <div className="flex-1 mx-20">
                    <Topbar />
                </div>
                <main className="flex-1 flex flex-col min-w-0 mt-5">
                    {children}
                </main>
            </div>
        </div>
    )
}