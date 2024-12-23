import Sidebar from "@/components/Sidebar"
import Topbar from "../../components/Topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Topbar/>
                {children}
            </main>
        </div>
    )
}
