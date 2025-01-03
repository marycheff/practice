import { ConversationHistoryResponse, FormattedConversationHistory } from "@/types/conversationHistory"
import { ChatHistoryResponse, FormattedChatHistory } from "../types/botHistory"

// Сортировка сообщений по дате (по возрастанию)
export function formatChatHistory(response: ChatHistoryResponse): FormattedChatHistory {
    return {
        total: response.total,
        messages: [...response.data].sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
    }
}

export function formatConversationHistory(response: ConversationHistoryResponse): FormattedConversationHistory {
    return {
        total: response.total,
        messages: [...response.data].sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
    }
}
