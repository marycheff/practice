"use client"
import AdminMessageSender from "@/components/AdminMesaageSender"
import ChatConversationHistory from "@/components/ChatConversationHistory"

import Loader from "@/components/loader/Loader"
import { useAuth } from "@/hooks/useAuth"
import { Container } from "@mui/material"
import { useEffect, useState } from "react"

const LiveAgentTestPage = () => {
    const conversationId = process.env.NEXT_PUBLIC_CONVERSATION_ID || "NO CONV.ID"
    const [loading, setLoading] = useState(true)
    const { handleLogin, checkToken } = useAuth()
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const isTokenValid = await checkToken()
                if (!isTokenValid) {
                    await handleLogin()
                }
            } finally {
                setLoading(false)
            }
        }
        initializeAuth()
    }, [handleLogin, checkToken])

    if (loading) return <Loader isOverlay={true} />

    const handleMessageSent = () => {
        // Здесь можно вызвать refetch для обновления истории чата
        // Например, если у вас есть доступ к refetch из useGetConversationChatHistoryQuery
    }

    return (
        <Container maxWidth="sm">
            <AdminMessageSender conversationId={conversationId} onMessageSent={handleMessageSent} />
            <ChatConversationHistory conversationId={conversationId} />
        </Container>
    )
}

export default LiveAgentTestPage
