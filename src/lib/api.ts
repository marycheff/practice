import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie } from "cookies-next"
import { LoginRequest, LoginResponse } from "../types/auth"
import { ChatHistoryResponse } from "../types/chat-history"

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
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        getChatHistory: builder.query<ChatHistoryResponse, void>({
            query: () => ({
                url: `/bot/chat-history/${process.env.NEXT_PUBLIC_BOT_ID}`,
                method: "GET",
            }),
        }),
    }),
})

export const { useLoginMutation, useGetChatHistoryQuery } = api
