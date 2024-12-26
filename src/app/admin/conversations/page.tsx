"use client"
import ConversationList from "@/components/ConversationList"
import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"

import { Box, Container, Typography } from "@mui/material"

import { useEffect } from "react"

const ConversationsPage = () => {
    // Проверка токена
    const { verifyToken, isLoading } = useTokenVerification()
    useEffect(() => {
        verifyToken()
    }, [verifyToken])
    if (isLoading) return <Loader isOverlay={true} />

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    История бесед
                </Typography>
                <ConversationList />
            </Box>
        </Container>
    )
}

export default ConversationsPage
