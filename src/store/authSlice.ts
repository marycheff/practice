import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null
    email: string | null
    tenantId: string | null
    isLoggingIn: boolean
    loginError: string | null
}

const initialState: AuthState = {
    token: null,
    email: null,
    tenantId: null,
    isLoggingIn: false,
    loginError: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; email: string; tenant_id: string }>) => {
            state.token = action.payload.token
            state.email = action.payload.email
            state.tenantId = action.payload.tenant_id
            state.isLoggingIn = false
            state.loginError = null
        },
        logout: state => {
            state.token = null
            state.email = null
            state.tenantId = null
            state.isLoggingIn = false
        },
        setIsLoggingIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggingIn = action.payload
        },
        setLoginError: (state, action: PayloadAction<string | null>) => {
            state.loginError = action.payload
            state.isLoggingIn = false
        },
    },
})

export const { setCredentials, logout, setIsLoggingIn, setLoginError } = authSlice.actions
export default authSlice.reducer
