import { useAuth } from "@/hooks/useAuth"
import { isTokenExpired } from "@/utils/checkTokenExpired"
import { getCookie } from "cookies-next"
import { useCallback, useState } from "react"

export const useTokenVerification = () => {
    const { handleLogin } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const verifyToken = useCallback(async () => {
        setLoading(true)
        setError(null)
        const token = getCookie("token") as string
        if (!token || isTokenExpired(token)) {
            const loginSuccess = await handleLogin()
            if (!loginSuccess) {
                setError("Failed to authenticate. Please try again.")
            }
        }
        setLoading(false)
    }, [handleLogin])

    const verifyTokenAndRefetch = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (refetchFunction: () => Promise<any>) => {
            await verifyToken()
            if (!error) {
                return refetchFunction()
            }
            return null
        },
        [verifyToken, error]
    )

    return { verifyToken, verifyTokenAndRefetch, loading, error }
}
