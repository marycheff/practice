// Типы для отправки вопроса и получения ответа от API
export interface ChatRequest {
    question: string
    origin: string
    conversation_id: string
}

export interface ChatResponse {
    message: string
    conversation_id: string
}
