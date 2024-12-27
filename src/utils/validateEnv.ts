import { botIds } from "@/config/bot"

export const validateEnv = () => {
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!email || !password || !apiUrl || !botIds) {
        console.error("Не все переменные окружения есть в файле .env")
        throw new Error("Не все переменные окружения есть в файле .env")
    }
    return { email, password, apiUrl, botIds }
}
