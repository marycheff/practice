import { useLoginMutation } from "@/lib/api"
import { deleteCookie, setCookie } from "cookies-next"
import { useCallback } from "react"

export const useAuth = () => {
    const [login] = useLoginMutation()
    const handleLogin = useCallback(async () => {
        try {
            const result = await login().unwrap()
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
