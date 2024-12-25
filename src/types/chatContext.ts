import { ChatHistoryResponse } from "@/types/botHistory"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export interface ChatContextType {
    conversationId: string
    chatHistory: ChatHistoryResponse | undefined
    isLoading: boolean
    error: FetchBaseQueryError | SerializedError | undefined
    sendMessage: (reply: string) => Promise<void>
    refreshChatHistory: () => Promise<void>
}
