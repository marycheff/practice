"use client"
import AdminReply from "@/components/UI/AdminReply"
import ChatConversationHistory from "@/components/ConversationHistory"
import Loader from "@/components/UI/loader/Loader"
import { ChatProvider } from "@/contexts/ChatContext"
import { useAuth } from "@/hooks/useAuth"
import { tokens } from "@/theme"
import { Container, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

const ReplyPage = () => {
    const conversationId = process.env.NEXT_PUBLIC_CONVERSATION_ID || ""

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
        <ChatProvider conversationId={conversationId}>
            <Container maxWidth="md">
                <AdminReply />
                <ChatConversationHistory />
            </Container>
        </ChatProvider>
    )
}

export default ReplyPage
