import "../globals.css";
import Sidebar from "@/components/sidebar/index";

export default function SistemaLayout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex mt-28 mx-20 flex-col min-w-0 mt-5">
                {children}
            </main>
        </div>
    )
}