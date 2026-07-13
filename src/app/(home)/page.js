"use client"

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Header from "@/components/features/home/HomeHeader"
import SummaryCard from "@/components/features/home/SummaryCard"
import HomeFooter from "@/components/features/home/HomeFooter"
import RecentActivity from "@/components/features/home/RecentActivity"

export default function Home(){
    useDocumentTitle("Home");

    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
        Cookies.remove("jwt")
        router.push("/login")
    }

    return(
        <div className="flex flex-1 flex-col">
            <Header />
            <section className="flex gap-10 my-auto">
                <RecentActivity />
                <SummaryCard />
            </section>
            <HomeFooter />
        </div>
    )
}
