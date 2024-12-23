import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useLazyCheckTokenQuery, useLoginMutation } from "../lib/api"
import { setCredentials } from "../store/authSlice"
import { isTokenExpired } from "../utils/check-token-expired"

export const useAuth = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const [triggerCheckToken] = useLazyCheckTokenQuery()

    // Логин с сохранением токена
    const handleLogin = useCallback(async () => {
        try {
            console.log("Вход")
            const email = process.env.NEXT_PUBLIC_API_EMAIL
            const password = process.env.NEXT_PUBLIC_API_PASSWORD

            if (!email || !password) {
                throw new Error("Email или password не найдены в .env")
            }
            const result = await login({ email, password }).unwrap()
            const { token, tenant_id } = result.data
            dispatch(setCredentials({ token, email, tenantId: tenant_id }))
            setCookie("token", token, { maxAge: 30 * 24 * 60 * 60 })
        } catch (error) {
            console.error("Ошибка входа:", error)
        }
    }, [dispatch, login])

    // Проверка токена
    const checkToken = useCallback(async (): Promise<boolean> => {
        const token = getCookie("token") as string
        if (!token) {
            return false
        }
        if (isTokenExpired(token)) {
            deleteCookie("token")
            return false
        }
        const { data: isValid } = await triggerCheckToken()
        return isValid || false
    }, [triggerCheckToken])

    return { handleLogin, checkToken }
}
