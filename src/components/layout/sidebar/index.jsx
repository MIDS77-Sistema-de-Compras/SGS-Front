import { Profile } from "./Profile";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer"; 
import { cookies } from "next/headers";

export default async function Sidebar(){
    const cookieStore = await cookies()
    const userRole = cookieStore.get('role')?.value
    const userName = cookieStore.get('name')?.value || "Usuário"

    return (
        <aside className="w-72 bg-[#103D85] h-screen flex flex-col justify-between text-white py-8 px-4 shadow-xl select-none">
            <div className="flex flex-col gap-8">
                <Profile name={userName} role={userRole} />
                <Navigation userRole={userRole} />
            </div>
            <Footer />
        </aside>
    )
}