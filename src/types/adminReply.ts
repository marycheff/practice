// Ответ админа
export interface AdminReplyRequest {
    reply: string
    conversation_id: string
}

export interface AdminReplyResponse {
    status: string
}
