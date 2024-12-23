// src/types/chat-history-response.ts

export interface UserIdentification {
    id: string
    contact_name: string
    business_name: string
    email_address: string
    phone_no: string
}

export interface ChatData {
    qa_id: string
    question: string
    answer: string
    like_status: string
    origin: string
    is_read: boolean
    is_priority: boolean
    chat_via: string
    created_at: string
    user_identification: UserIdentification
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

export interface ChatHistoryConversationResponse {
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
    data: ChatData[]
}
