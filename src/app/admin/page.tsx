"use client"

import ChatHistory from "@/components/ChatHistory"
import Loader from "@/components/loader/Loader"
import { useAuth } from "@/hooks/useAuth"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

const AdminPage = () => {
    const token = getCookie("token") as string
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { handleLogin, checkToken } = useAuth()
    const [showChatHistory, setShowChatHistory] = useState(false)

    const toggleChatHistory = () => setShowChatHistory(prev => !prev)

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const isTokenValid = await checkToken()
                if (!isTokenValid) {
                    await handleLogin()
                }
                setError(null)
            } catch (error: unknown) {
                setError(`Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
            } finally {
                setLoading(false)
            }
        }

        initializeAuth()
    }, [handleLogin, checkToken])

    if (loading) {
        return <Loader isOverlay={true} />
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className="max-w-4xl mx-auto  rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
            <p className="text-xs text-gray-600 mb-4 break-all">Token: {token}</p>

            <button
                onClick={toggleChatHistory}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                {showChatHistory ? "Скрыть" : "Показать историю"}
            </button>
            {showChatHistory && <ChatHistory />}
        </div>
    )
}

export default AdminPage
