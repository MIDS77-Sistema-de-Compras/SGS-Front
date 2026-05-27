"use client"

import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Header from "@/components/home/HomeHeader"
import SummaryCard from "@/components/home/SummaryCard"
import HomeFooter from "@/components/home/HomeFooter"
import RecentActivity from "@/components/home/RecentActivity"

export default function Home(){
    const router = useRouter()

    function handleLogout(){
        Cookies.remove("token")
        router.push("/login")
    }

    return(
        <div className="flex flex-1 flex-col">
            <Header />
            <section className="flex gap-10 mt-15">
                <RecentActivity />
                <SummaryCard />
            </section>
            <HomeFooter />
        </div>
    )
}