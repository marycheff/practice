import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store/store"
import { LoginRequest, LoginResponse } from "../types/auth"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
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
    }),
})

export const { useLoginMutation } = api
