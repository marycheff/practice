"use client"

import ChatConversationHistory from "@/components/ConversationHistory"
import Loader from "@/components/UI/loader/Loader"
import { ChatProvider } from "@/contexts/ChatContext"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { tokens } from "@/theme"

import { Box, Container, Typography, useTheme } from "@mui/material"
import { useParams } from "next/navigation" // Используем useParams для работы с параметрами пути
import { useEffect } from "react"

const ReplyPage = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { verifyToken, loading } = useTokenVerification()
    const { conversationId } = useParams()

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    if (loading || !conversationId) return <Loader isOverlay={true} />
    // Приводим conversationId к строке
    const conversationIdString = Array.isArray(conversationId) ? conversationId[0] : conversationId

    return (
        <ChatProvider conversationId={conversationIdString}>
            <Container maxWidth="md">
                <Typography variant="h5" sx={{ color: colors.grey[100], textAlign: "center" }}>
                    Беседа {conversationIdString}
                </Typography>

                <Box mt={2}>
                    <ChatConversationHistory />
                </Box>
            </Container>
        </ChatProvider>
    )
}

export default ReplyPage
