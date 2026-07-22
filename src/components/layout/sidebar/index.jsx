import { Profile } from "./Profile";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SidebarShell } from "./SidebarShell";
import { cookies } from "next/headers";

export default async function Sidebar(){
    const cookieStore = await cookies()
    const userRole = cookieStore.get('role')?.value
    const userName = cookieStore.get('name')?.value || "Usuário"

    return (
        <SidebarShell>
            <div className="flex flex-col gap-8">
                <Profile name={userName} role={userRole} />
                <Navigation userRole={userRole} />
            </div>
            <Footer />
        </SidebarShell>
    )
}