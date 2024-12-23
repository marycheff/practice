import { LiveAgentReplyRequest, LiveAgentReplyResponse } from "@/types/admin-reply"
import { LoginRequest, LoginResponse } from "@/types/auth"
import { ChatHistoryResponse } from "@/types/chat-history" // Импортируйте существующий тип

import { ChatHistoryConversationResponse } from "@/types/chat-history-conversation"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { deleteCookie, getCookie } from "cookies-next"
if (!process.env.NEXT_PUBLIC_API_EMAIL || !process.env.NEXT_PUBLIC_API_PASSWORD) {
    throw new Error("Email или password не найдены в .env")
}
if (!process.env.NEXT_PUBLIC_BOT_ID) {
    throw new Error("Переменная NEXT_PUBLIC_BOT_ID не найдена в .env файле")
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: headers => {
            const token = getCookie("token")
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: builder => ({
        // Авторизация
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        // Получение истории чата
        getChatHistory: builder.query<ChatHistoryResponse, void>({
            query: () => ({
                url: `/bot/chat-history/${process.env.NEXT_PUBLIC_BOT_ID}`,
                method: "GET",
            }),
        }),
        // Получение истории чата по conversation_Id
        getConversationChatHistory: builder.query<ChatHistoryConversationResponse, string>({
            query: conversationId => ({
                url: `https://api.buildchatbot.ai/api/v1/conversation/chat-history/${conversationId}`,
                method: "GET",
            }),
        }),
        // Проверка токена на рандомном запросе
        checkToken: builder.query<boolean, void>({
            queryFn: async (_, _queryApi, _extraOptions, fetchBaseQuery) => {
                try {
                    const response = await fetchBaseQuery({
                        url: "/user/get_all_user_bots/",
                        method: "GET",
                    })
                    if (response.error) {
                        deleteCookie("token")
                        return { data: false }
                    }
                    const result = (await response.data) as { status: string }
                    return { data: result.status === "success" }
                } catch (error) {
                    console.error("Ошибка при запросе проверки токена:", error)
                    return { data: false }
                }
            },
        }),
        // Ответ живого агента
        liveAgentReply: builder.mutation<LiveAgentReplyResponse, LiveAgentReplyRequest>({
            query: replyData => ({
                url: "/bot/reply_with_live_agent/",
                method: "POST",
                body: replyData,
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useGetChatHistoryQuery,
    useGetConversationChatHistoryQuery, // Экспортируйте новый хук
    useLazyCheckTokenQuery,
    useLiveAgentReplyMutation,
} = api
