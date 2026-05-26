import Topbar from "@/components/topbar/Topbar";
import "../globals.css";
import Sidebar from "@/components/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <div className="w-full ml-20">
                <Topbar />
            </div>
            <main className="flex-1 flex flex-col min-w-0 mt-5">
                {children}
            </main>
        </div>
    )
}