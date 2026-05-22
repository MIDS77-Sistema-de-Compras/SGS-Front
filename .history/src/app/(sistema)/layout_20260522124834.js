import Sidebar from "@/components/sidebar/Sidebar";


export default function SistemaLayout({ children }) {
    return (<body className="h-screen flex overflow-hidden">


        <Sidebar />
        <main></main>

    </body>)
}