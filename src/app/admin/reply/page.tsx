"use client"
import AdminMessageSender from "@/components/AdminMesaageSender"
import ChatConversationHistory from "@/components/ChatConversationHistory"

import Loader from "@/components/loader/Loader"
import { Container } from "@mui/material"
import { useEffect, useState } from "react"

const LiveAgentTestPage = () => {
    const [loading, setLoading] = useState(true)
    const conversationId = process.env.NEXT_PUBLIC_CONVERSATION_ID || ""

    useEffect(() => {
        // Здесь можно добавить логику для проверки токена, если это необходимо
        setLoading(false)
    }, [])

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
