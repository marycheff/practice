import { validateEnv } from "@/utils/validateEnv"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    const { email: envEmail, password: envPassword } = validateEnv()
    if (email === envEmail && password === envPassword) {
        return NextResponse.json({ success: true, message: "Успешная авторизация" })
    } else {
        return NextResponse.json({ success: false, message: "Неверный логин или пароль" }, { status: 401 })
    }
}
