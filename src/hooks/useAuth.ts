import { getCookie, setCookie } from "cookies-next"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "../lib/api"
import { setCredentials } from "../store/authSlice"

export const useAuth = () => {
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const [loginAttempted, setLoginAttempted] = useState(false)

    const handleLogin = useCallback(async () => {
        if (loginAttempted) return
        try {
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
        } finally {
            setLoginAttempted(true)
        }
    }, [dispatch, login, loginAttempted])

    const checkToken = () => {
        const token = getCookie("token")
        return !!token
    }

    return { handleLogin, checkToken, loginAttempted }
}
