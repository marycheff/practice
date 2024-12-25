import { useLoginMutation } from "@/lib/api"
import { setCookie, deleteCookie } from "cookies-next"
import { useCallback } from "react"

export const useAuth = () => {
    const [login] = useLoginMutation()

    const handleLogin = useCallback(async () => {
        try {
            const email = process.env.NEXT_PUBLIC_API_EMAIL
            const password = process.env.NEXT_PUBLIC_API_PASSWORD

            if (!email || !password) {
                throw new Error("Email или password не найдены в .env")
            }
            const result = await login({ email, password }).unwrap()
            setCookie("token", result.data.token, { maxAge: 30 * 24 * 60 * 60 })
            return true
        } catch (error) {
            console.error("Ошибка входа:", error)
            deleteCookie("token")
            return false
        }
    }, [login])

    return { handleLogin }
}
