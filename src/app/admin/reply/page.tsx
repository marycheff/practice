"use client"
import ChatConversationHistory from "@/components/ConversationHistory"
import AdminReply from "@/components/UI/AdminReply"
import Loader from "@/components/UI/loader/Loader"
import { ChatProvider } from "@/contexts/ChatContext"
import { useTokenVerification } from "@/hooks/useTokenVerification"

import { Container } from "@mui/material"
import { useEffect } from "react"

const ReplyPage = () => {
    const { verifyToken, loading } = useTokenVerification()

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    if (loading) return <Loader isOverlay={true} />

    const conversationId = process.env.NEXT_PUBLIC_CONVERSATION_ID || ""

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
