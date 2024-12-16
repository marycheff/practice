export interface ChatHistoryResponse {
    status: string
    links: {
        next: string | null
        previous: string | null
    }
    per_page: number
    page: number
    total_pages: number
    total: number
    bot_id: string
    data: ChatMessage[]
}

export interface ChatMessage {
    question: string
    answer: string
    like_status: string
    origin: string
    is_read: boolean
    is_priority: boolean
    created_at: string
    user_identification: {
        id: string
        contact_name: string
        business_name: string
        email_address: string
        phone_no: string
    }
}

export interface FormattedChatHistory {
    total: number
    messages: {
        question: string
        answer: string
        created_at: string
    }[]
}
