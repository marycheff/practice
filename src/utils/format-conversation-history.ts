import { FormattedChatHistory } from "@/types/chat-history"
import { ChatHistoryConversationResponse } from "@/types/chat-history-conversation"

export function formatChatHistory(response: ChatHistoryConversationResponse): FormattedChatHistory {
    return {
        total: response.total,
        messages: [...response.data].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    }
}
