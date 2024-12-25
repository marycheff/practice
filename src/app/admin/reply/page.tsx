"use client"
import AdminReply from "@/components/AdminReply"
import ChatConversationHistory from "@/components/ConversationHistory"
import Loader from "@/components/UI/loader/Loader"
import { ChatProvider } from "@/contexts/ChatContext"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { tokens } from "@/theme"

import { Box, Container, Typography, useTheme } from "@mui/material"
import { useEffect } from "react"

const ReplyPage = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // Проверка токена
    const { verifyToken, loading } = useTokenVerification()
    useEffect(() => {
        verifyToken()
    }, [verifyToken])
    if (loading) return <Loader isOverlay={true} />

    const conversationId = process.env.NEXT_PUBLIC_CONVERSATION_ID || ""
    return (
        <ChatProvider conversationId={conversationId}>
            <Container maxWidth="md">
                <Typography variant="h4" sx={{ color: colors.grey[100], textAlign: "center" }}>
                    Ответ админа
                </Typography>
                <Box mt={2}>
                    <AdminReply />
                    <ChatConversationHistory />
                </Box>
            </Container>
        </ChatProvider>
    )
}

export default ReplyPage
