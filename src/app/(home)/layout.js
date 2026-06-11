import "../globals.css";
import Sidebar from "@/components/layout/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex mx-20 flex-col min-w-0 mt-6 mb-6">
                {children}
            </main>
        </div>
    )
}