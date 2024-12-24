import { useGetConversationChatHistoryQuery, useLiveAgentReplyMutation } from "@/lib/api"
import { ChatContextType } from "@/types/chat-context"
import { createContext, FC, ReactNode, useCallback, useContext } from "react"
const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: FC<{ conversationId: string; children: ReactNode }> = ({ conversationId, children }) => {
    const {
        data: chatHistory,
        isFetching: isLoading,
        error,
        refetch,
    } = useGetConversationChatHistoryQuery(conversationId)

    const [sendLiveAgentReply] = useLiveAgentReplyMutation()

    const sendMessage = useCallback(
        async (reply: string) => {
            await sendLiveAgentReply({ reply, conversation_id: conversationId }).unwrap()
            refetch()
        },
        [sendLiveAgentReply, conversationId, refetch]
    )

    const refreshChatHistory = useCallback(() => {
        refetch()
    }, [refetch])

    const value = {
        conversationId,
        chatHistory,
        isLoading,
        error,
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
