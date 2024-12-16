import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null
    email: string | null
    user_tenant_bot_count: number | null
    tenant_id: string | null
}

const initialState: AuthState = {
    token: null,
    email: null,
    user_tenant_bot_count: null,
    tenant_id: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (
            state,
            action: PayloadAction<{
                token: string
                email: string
                user_tenant_bot_count: number
                tenant_id: string
            }>
        ) => {
            state.token = action.payload.token
            state.email = action.payload.email
            state.user_tenant_bot_count = action.payload.user_tenant_bot_count
            state.tenant_id = action.payload.tenant_id
        },
        clearAuthData: state => {
            state.token = null
            state.email = null
            state.user_tenant_bot_count = null
            state.tenant_id = null
        },
    },
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer
