"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ChatHistory from "../../components/ChatHistory"
import Loader from "../../components/loader/Loader"
import { useAuth } from "../../hooks/useAuth"
import { RootState } from "../../store/store"

const AdminPage = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { handleLogin, loginAttempted } = useAuth()
    const [showChatHistory, setShowChatHistory] = useState(false)
    const toggleChatHistory = () => {
        setShowChatHistory(prev => !prev)
    }
    useEffect(() => {
        const fetchToken = async () => {
            if (!loginAttempted) {
                try {
                    await handleLogin()
                    setError(null)
                } catch (error: unknown) {
                    setError(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        fetchToken()
    }, [handleLogin, loginAttempted])

    if (loading) {
        return <Loader isOverlay={true} />
    }

    if (error) {
        return <div>Error: {error}</div>
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
