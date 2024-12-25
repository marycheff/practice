import { LiveAgentReplyRequest, LiveAgentReplyResponse } from "@/types/admin-reply"
import { LoginRequest, LoginResponse } from "@/types/auth"
import { ChatHistoryResponse } from "@/types/bot-history"
import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    try {
        let result = await baseQuery(args, api, extraOptions)
        if (result.error && (result.error as FetchBaseQueryError).status === 401) {
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
                //api.dispatch(setCredentials({ ...(refreshResult.data as LoginResponse).data }))
                result = await baseQuery(args, api, extraOptions)
                setCookie("token", (refreshResult.data as LoginResponse).data.token)
                console.log("123")
            } else {
                //api.dispatch(logout())
            }
        }
        return result
    } catch (error) {
        console.error("API request error:", error)
        return {
            error: {
                status: "FETCH_ERROR",
                error: error instanceof Error ? error.message : "Ошибка сети при выполнении запроса",
            },
        }
    }
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        getChatHistory: builder.query<ChatHistoryResponse, void>({
            query: () => `/bot/chat-history/${process.env.NEXT_PUBLIC_BOT_ID}/`,
        }),
        getConversationChatHistory: builder.query<ChatHistoryResponse, string>({
            query: conversationId => `/conversation/chat-history/${conversationId}/`,
        }),
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
    useGetConversationChatHistoryQuery,
    useLiveAgentReplyMutation,
} = api
