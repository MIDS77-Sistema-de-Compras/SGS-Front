"use client"

import { useState, useEffect } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Header from "@/components/features/home/HomeHeader"
import SummaryCard from "@/components/features/home/SummaryCard"
import HomeFooter from "@/components/features/home/HomeFooter"
import RecentActivity from "@/components/features/home/RecentActivity"
import { getUserRole } from "@/lib/utils/getUserRole";
import CompradorFooter from "@/components/features/home/CompradorFooter";
import CompradorSummaryCard from "@/components/features/home/CompradorSummaryCard";

export default function Home() {
    useDocumentTitle("Home");

    const [role, setRole] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const userRole = getUserRole();
        setRole(userRole);

        setMounted(true);
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-8 lg:gap-0">
            <Header />

            <section className="flex flex-col-reverse lg:flex-row gap-6 min-[1350px]:gap-10 lg:my-auto">
                <RecentActivity />
                {mounted ? (
                    role === "COMPRADOR" ? <CompradorSummaryCard /> : <SummaryCard />
                ) : (
                    <div className="min-h-[172px]" />
                )}
                
            </section>

            {mounted ? (
                role === "COMPRADOR" ? <CompradorFooter /> : <HomeFooter />
            ) : (
                <div className="min-h-[72px]" />
            )}
        </div>
    )
}