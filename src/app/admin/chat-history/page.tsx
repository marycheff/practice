"use client"
import BotHistory from "@/components/BotHistory"
import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { tokens } from "@/theme"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { useEffect } from "react"

const ChatHistoryPage = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // Проверка токена
    const { verifyToken, isLoading } = useTokenVerification()
    useEffect(() => {
        verifyToken()
    }, [verifyToken])
    if (isLoading) return <Loader isOverlay={true} />

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ color: colors.grey[100], textAlign: "center" }}>
                История сообщений с ботом
            </Typography>
            <Box mt={2}>
                <BotHistory />
            </Box>
        </Container>
    )
}

export default ChatHistoryPage
