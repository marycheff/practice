import { useTokenVerification } from "@/hooks/useTokenVerification"
import { useGetConversationChatHistoryQuery, useLiveAgentReplyMutation } from "@/lib/api"
import { ChatContextType } from "@/types/chat-context"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { createContext, FC, ReactNode, useCallback, useContext, useState } from "react"

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: FC<{ conversationId: string; children: ReactNode }> = ({ conversationId, children }) => {
    const {
        data: chatHistory,
        isFetching: isQueryLoading,
        error,
        refetch,
    } = useGetConversationChatHistoryQuery(conversationId)

    const [sendLiveAgentReply] = useLiveAgentReplyMutation()
    const { verifyToken, loading: isVerifying } = useTokenVerification()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const sendMessage = useCallback(
        async (reply: string) => {
            await verifyToken()
            await sendLiveAgentReply({ reply, conversation_id: conversationId }).unwrap()
            setIsRefreshing(true)
            await refetch()
            setIsRefreshing(false)
        },
        [sendLiveAgentReply, conversationId, refetch, verifyToken]
    )

    const refreshChatHistory = useCallback(async () => {
        await verifyToken()
        setIsRefreshing(true)
        await refetch()
        setIsRefreshing(false)
    }, [refetch, verifyToken])

    const isLoading = isQueryLoading || isVerifying || isRefreshing

    const value: ChatContextType = {
        conversationId,
        chatHistory,
        isLoading,
        error: error as FetchBaseQueryError | SerializedError | undefined,
        sendMessage,
        refreshChatHistory,
    }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChatContext = () => {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error("useChatContext must be used within a ChatProvider")
    }
    return context
}
