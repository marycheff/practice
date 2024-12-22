import { jwtDecode } from "jwt-decode"

interface DecodedToken {
    exp: number
}
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token)
        const currentTime = Math.floor(Date.now() / 1000)
        return decoded.exp < currentTime
    } catch {
        return true
    }
}
