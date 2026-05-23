import "../"
import Sidebar from "@/components/sidebar/Sidebar";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 mt-5">
                {children}
            </main>
        </div>
    )
}