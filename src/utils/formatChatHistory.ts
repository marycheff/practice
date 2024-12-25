import { ChatHistoryResponse, FormattedChatHistory } from "../types/botHistory"

// Сортировка сообщений по дате
export function formatChatHistory(response: ChatHistoryResponse): FormattedChatHistory {
    return {
        total: response.total,
        messages: [...response.data].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    }
}
