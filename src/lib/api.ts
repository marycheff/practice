import { AdminReplyRequest, AdminReplyResponse } from "@/types/adminReply"
import { LoginRequest, LoginResponse } from "@/types/auth"
import { ChatHistoryResponse } from "@/types/botHistory"
import { ConversationHistoryResponse } from "@/types/conversationHistory"
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

// Создаем базовый запрос с использованием fetchBaseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: headers => {
        const token = getCookie("token")
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
})

// Создаем базовый запрос с повторной аутентификацией
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions) // Выполняем базовый запрос
    if (result.error && (result.error as FetchBaseQueryError).status === 401) {
        // Проверка на 401
        deleteCookie("token")
        const refreshResult = await baseQuery(
            {
                url: "/login",
                method: "POST",
                body: {
                    email: process.env.NEXT_PUBLIC_API_EMAIL,
                    password: process.env.NEXT_PUBLIC_API_PASSWORD,
                },
            },
            api,
            extraOptions
        )
        if (refreshResult.data) {
            // Если повторная аутентификация успешна
            setCookie("token", (refreshResult.data as LoginResponse).data.token) // Устанавливаем токен в куки
            result = await baseQuery(args, api, extraOptions) // Повторяем исходный запрос
        }
    }
    return result
}

// Создание API
export const api = createApi({
    baseQuery: baseQueryWithReAuth, // Устанавливаем базовый запрос с повторной аутентификацией
    endpoints: builder => ({
        // Определяем эндпоинт для входа
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        // Определяем эндпоинт для получения истории чата
        getChatHistory: builder.query<ChatHistoryResponse, void>({
            query: () => `/bot/chat-history/${process.env.NEXT_PUBLIC_BOT_ID}/`,
        }),
        // Определяем эндпоинт для получения истории чата по conversationId
        getConversationChatHistory: builder.query<ConversationHistoryResponse, string>({
            query: conversationId => `/conversation/chat-history/${conversationId}/`,
        }),
        // Определяем эндпоинт для ответа админа
        liveAgentReply: builder.mutation<AdminReplyResponse, AdminReplyRequest>({
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
    useGetConversationChatHistoryQuery,
    useLiveAgentReplyMutation,
} = api
