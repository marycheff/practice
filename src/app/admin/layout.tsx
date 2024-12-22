import Sidebar from "@/components/Sidebar"
import Topbar from "../../components/Topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main>
                <Topbar />
                {children}
            </main>
        </div>
    )
}
