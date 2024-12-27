import { LoginResponse } from "@/types/auth"
import { ChatHistoryResponse } from "@/types/botHistory"
import { ConversationHistoryResponse } from "@/types/conversationHistory"
import { RecentChatHistoryResponse } from "@/types/recentChatHistory"
import { validateEnv } from "@/utils/validateEnv"
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

const { email, password, apiUrl } = validateEnv()
const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: headers => {
        const token = getCookie("token")
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    },
})

// Авторизация 2 раза
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions)

    // Авторизация второй раз в случае ошибки 401 (токен неверный)
    if (result.error && (result.error as FetchBaseQueryError).status === 401) {
        deleteCookie("token")
        const refreshResult = await baseQuery(
            {
                url: "/login",
                method: "POST",
                body: {
                    email: email,
                    password: password,
                },
            },
            api,
            extraOptions
        )
        if (refreshResult.data) {
            // Если повторная аутентификация успешна
            setCookie("token", (refreshResult.data as LoginResponse).data.token)
            // Повторение исходного запроса
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

// Создание API
export const api = createApi({
    // Установка базового запрос с повторным входом
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, void>({
            query: () => ({
                url: "/login",
                method: "POST",
                body: {
                    email: email,
                    password: password,
                },
            }),
        }),
        // Получение истории чата
        getBotHistory: builder.query<ChatHistoryResponse, void>({
            query: () => `/bot/chat-history/2a1cc9a4-b118-4275-a3f9-54e8a637f293/`,
        }),
        // Получение истории чата по conversationId
        getConversationHistory: builder.query<ConversationHistoryResponse, string>({
            query: conversationId => `/conversation/chat-history/${conversationId}/`,
        }),
        // Получение всех бесед
        getRecentChatHistory: builder.query<RecentChatHistoryResponse, void>({
            query: () => `bot/chat-history/recent/`,
        }),
    }),
})

export const { useLoginMutation, useGetBotHistoryQuery, useGetConversationHistoryQuery, useGetRecentChatHistoryQuery } =
    api
