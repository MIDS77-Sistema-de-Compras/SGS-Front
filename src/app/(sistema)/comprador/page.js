"use client";

import Header from "@/components/features/home/HomeHeader";
import HomeFooter from "@/components/features/home/HomeFooter";
import RecentActivity from "@/components/features/home/RecentActivity";
import SummaryCard from "@/components/features/home/SummaryCard";

export default function HomeComprador() {
    return (
        <div className="flex flex-1 flex-col">
            <Header />
            <section className="flex gap-10 mt-15">
                <RecentActivity />
                <SummaryCard />
            </section>
            <HomeFooter />
        </div>
    );
}
