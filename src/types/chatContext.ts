import { ConversationHistoryResponse } from "@/types/conversationHistory"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export interface ChatContextType {
    conversationId: string
    chatHistory: ConversationHistoryResponse | undefined
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    sendMessage: (reply: string) => Promise<void>
    refreshChatHistory: () => Promise<void>
}
