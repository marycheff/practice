export interface UserIdentification {
    id: string
    contact_name: string
    business_name: string
    email_address: string
    phone_no: string
}

export interface ChatHistoryItem {
    qa_id: string
    conversation_id: string
    bot_id: string
    question: string
    answer: string
    origin: string
    is_read: boolean
    is_priority: boolean
    is_anonymous_user: string
    like_status: string
    created_at: string
    user_name: string
    user_identification: UserIdentification
}

export interface RecentChatHistoryResponse {
    status: string
    links: {
        next: string | null
        previous: string | null
    }
    per_page: number
    page: number
    total_pages: number
    total: number
    primary_live_chat_integration: string
    data: ChatHistoryItem[]
}
