import { Message } from "@/types/botHistory"

export interface ConversationMessage extends Message {
    qa_id: string
    question: string
    chat_via: string
}

export interface BotInfo {
    icon: string
    name: string
    description: string
    user_name: string
    created_at: string
}

export interface ConversationInfo {
    id: string
    is_read: boolean
    is_priority: boolean
    is_bookmarked: boolean
    chat_via: string
    reply_by: string
}

export interface ConversationHistoryResponse {
    status: string
    links: {
        next: string | null
        previous: string | null
    }
    per_page: number
    page: number
    total_pages: number
    total: number
    bot: BotInfo
    conversation: ConversationInfo
    data: ConversationMessage[]
}
