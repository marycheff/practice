"use client"
import BotHistory from "@/components/BotHistory"
import { Box, Container } from "@mui/material"
import { useEffect } from "react"

import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"

const ChatHistoryPage = () => {
    const { verifyToken, loading } = useTokenVerification()

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    if (loading) return <Loader isOverlay={true} />

    return (
        <Container maxWidth="md">
            <Box mt={4}>
                <BotHistory />
            </Box>
        </Container>
    )
}

export default ChatHistoryPage
