import { LoginResponse } from "../types/api"

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        console.error("Ошибка авторизации:", response.status, response.statusText)
        throw new Error("Ошибка авторизации")
    }

    const data: LoginResponse = await response.json()
    console.log("Токен обновлен")
    console.log(data.data.token)
    return data
}
