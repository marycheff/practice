"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ChatBot from "../../components/ChatBot"
import { login } from "../../lib/api"
import { AppDispatch, RootState } from "../../store"
import { setAuthData } from "../../store/authSlice"
import { LoginResponse } from "../../types/api"

const AdminPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const token = useSelector((state: RootState) => state.auth.token)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "no email"
                const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "no password"
                const data: LoginResponse = await login(email, password)

                dispatch(
                    setAuthData({
                        token: data.data.token,
                        email: data.data.email,
                        user_tenant_bot_count: data.data.user_tenant_bot_count,
                        tenant_id: data.data.tenant_id,
                    })
                )
                setError(null)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(`Ошибка: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchToken()
    }, [dispatch])

    if (loading) {
        return <div>Загрузка...</div>
    }

    if (error) {
        return <div>Ошибка: {error}</div>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center mb-6">
                <h1>Панель администратора</h1>
                <p>Добро пожаловать! Ваш токен обновлен.</p>
                <p className="text-xs text-gray-600 mt-2 px-7">Токен: {token}</p>
            </div>
            <ChatBot />
        </div>
    )
}

export default AdminPage
