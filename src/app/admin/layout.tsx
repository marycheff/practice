import Sidebar from "@/components/UI/Sidebar"
import Topbar from "@/components/UI/Topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Topbar />
                {children}
            </main>
        </div>
    )
}
