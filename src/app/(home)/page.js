import Header from "@/components/features/home/HomeHeader"
import SummaryCard from "@/components/features/home/SummaryCard"
import HomeFooter from "@/components/features/home/HomeFooter"
import RecentActivity from "@/components/features/home/RecentActivity"

export default function Home(){

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
