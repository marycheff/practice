export const validateEnv = () => {
    const email = process.env.NEXT_PUBLIC_API_EMAIL
    const password = process.env.NEXT_PUBLIC_API_PASSWORD
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const botId = process.env.NEXT_PUBLIC_BOT_ID
    if (!email || !password || !apiUrl || !botId) {
        console.error("Не все переменные окружения есть в файле .env")
        throw new Error("Не все переменные окружения есть в файле .env")
    }
    return { email, password, apiUrl, botId }
}
