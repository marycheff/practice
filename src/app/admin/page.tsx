"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "../../hooks/useAuth"
import { RootState } from "../../store/store"

const AdminPage = () => {
    const token = useSelector((state: RootState) => state.auth.token)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { handleLogin, loginAttempted } = useAuth()

    useEffect(() => {
        const fetchToken = async () => {
            if (!loginAttempted) {
                try {
                    await handleLogin()
                    setError(null)
                } catch (error: unknown) {
                    setError(`Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
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
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>Ошибка: {error}</div>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Админ панель</h1>
                <p className="mb-2">Вы вошли как админ. Токен обновлен</p>
                <p className="text-xs text-gray-600 mt-2 px-7 break-all">Token: {token}</p>
            </div>
        </div>
    )
}

export default AdminPage
