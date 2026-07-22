import "../globals.css";
import Sidebar from "@/components/layout/sidebar/index";
import { LoggedUserProvider } from "@/contexts/LoggedUserContext";

export default function SistemaLayout({ children }) {
    return (
        <LoggedUserProvider>
            <div className="min-h-screen lg:h-screen flex lg:overflow-hidden bg-white dark:bg-[#1A2233]">
                <Sidebar />
                <main className="flex-1 flex flex-col min-w-0 px-4 sm:px-8 lg:px-12 min-[1350px]:px-20 pt-20 lg:pt-14 min-[1350px]:pt-20 pb-8 lg:pb-16 min-[1350px]:pb-29 lg:overflow-y-auto">
                    {children}
                </main>
            </div>
        </LoggedUserProvider>
    )
}
