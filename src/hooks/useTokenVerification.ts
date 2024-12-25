import { useAuth } from "@/hooks/useAuth"
import { isTokenExpired } from "@/utils/check-token-expired"
import { getCookie } from "cookies-next"
import { useCallback, useState } from "react"

export const useTokenVerification = () => {
    const { handleLogin } = useAuth()
    const [loading, setLoading] = useState(false)

    const verifyToken = useCallback(async () => {
        setLoading(true)
        const token = getCookie("token") as string
        if (!token || isTokenExpired(token)) {
            await handleLogin()
        }
        setLoading(false)
    }, [handleLogin])

    const verifyTokenAndRefetch = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (refetchFunction: () => Promise<any>) => {
            await verifyToken()
            return refetchFunction()
        },
        [verifyToken]
    )

    return { verifyToken, verifyTokenAndRefetch, loading }
}
