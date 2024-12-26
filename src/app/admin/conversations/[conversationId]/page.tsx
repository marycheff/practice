"use client"

import ChatConversationHistory from "@/components/ConversationHistory"
import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { tokens } from "@/theme"

import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { useParams, useRouter } from "next/navigation" // Используем useParams для работы с параметрами пути
import { useEffect } from "react"

const ConversationPage = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const router = useRouter()
    const { verifyToken, isLoading } = useTokenVerification()

    const params = useParams()
    const conversationId = Array.isArray(params.conversationId) ? params.conversationId[0] : params.conversationId || ""

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    if (isLoading || !conversationId) return <Loader isOverlay={true} />
    // Приведение conversationId к строке
    const conversationIdString = Array.isArray(conversationId) ? conversationId[0] : conversationId

    return (
        <Container maxWidth="md">
            <Button
                onClick={() => router.back()} 
                sx={{
                    mb: 2,
                    px: 2,
                    backgroundColor: colors.greenAccent[700],
                    "&:hover": {
                        backgroundColor: colors.greenAccent[800],
                    },
                    color: colors.grey[100],
                }}>
                Назад
            </Button>
            <Typography variant="h5" sx={{ color: colors.grey[100], textAlign: "center" }}>
                Беседа {conversationIdString}
            </Typography>
            <Box mt={2}>
                <ChatConversationHistory conversationId={conversationId} />
            </Box>
        </Container>
    )
}

export default ConversationPage
