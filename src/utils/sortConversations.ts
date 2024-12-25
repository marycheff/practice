import { ChatHistoryItem } from "@/types/recentChatHistory"

export function sortConversations(data: ChatHistoryItem[]): { conversationId: string; latestMessage: string }[] {
    // Фильтр по qa_id
    const validItems = data.filter(item => item.qa_id !== "")

    // Группировка по conversation_id
    const groupedConversations = validItems.reduce((acc, item) => {
        if (!acc[item.conversation_id]) {
            acc[item.conversation_id] = []
        }
        acc[item.conversation_id].push(item)
        return acc
    }, {} as Record<string, ChatHistoryItem[]>)

    // Сортировка бесед по дате
    const sortedConversations = Object.entries(groupedConversations)
        .map(([conversationId, items]) => ({
            conversationId,
            latestMessage: items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
                .created_at,
        }))
        .sort((a, b) => new Date(b.latestMessage).getTime() - new Date(a.latestMessage).getTime())

    return sortedConversations
}
