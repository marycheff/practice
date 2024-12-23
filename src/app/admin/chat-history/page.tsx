"use client"
import ChatHistory from "@/components/ChatHistory"
import { Container, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

import Loader from "@/components/loader/Loader"
import { useAuth } from "@/hooks/useAuth"
import { tokens } from "@/theme"

const ChatHistoryPage = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { handleLogin, checkToken } = useAuth()
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const isTokenValid = await checkToken()
                if (!isTokenValid) {
                    await handleLogin()
                }
                setError(null)
            } catch (error: unknown) {
                setError(`Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
            } finally {
                setLoading(false)
            }
        }
        initializeAuth()
    }, [handleLogin, checkToken])

    if (loading) return <Loader isOverlay={true} />

    if (error) return <Typography color={colors.redAccent[500]}>{error}</Typography>

    return (
        <Container maxWidth="md">
            <ChatHistory />
        </Container>
    )
}

export default ChatHistoryPage
