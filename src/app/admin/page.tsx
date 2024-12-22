"use client"

import { useEffect, useState } from "react"

import { getCookie } from "cookies-next"
import ChatHistory from "../../components/ChatHistory"
import Loader from "../../components/loader/Loader"
import { useAuth } from "../../hooks/useAuth"

const AdminPage = () => {
    // const token = useSelector((state: RootState) => state.auth.token)
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
        return <div>Ошибка: {error}</div>
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
                <p className="text-xs text-gray-600 mb-4 break-all">Token: {token}</p>

                <button
                    onClick={toggleChatHistory}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    {showChatHistory ? "Скрыть" : "Показать историю"}
                </button>
                {showChatHistory && <ChatHistory />}
            </div>
        </div>
    )
}

export default AdminPage
