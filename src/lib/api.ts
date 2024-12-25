import { AdminReplyRequest, AdminReplyResponse } from "@/types/adminReply"
import { LoginRequest, LoginResponse } from "@/types/auth"
import { ChatHistoryResponse } from "@/types/botHistory"
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
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

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
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
            setCookie("token", (refreshResult.data as LoginResponse).data.token)
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
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
