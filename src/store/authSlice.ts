import { AuthState } from "@/types/auth"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    email: null,
    tenantId: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; email: string; tenantId: string }>) => {
            const { token, email, tenantId } = action.payload
            state.token = token
            state.isAuthenticated = true
            state.email = email
            state.tenantId = tenantId
        },
        logout: state => {
            state.token = null
            state.isAuthenticated = false
            state.email = null
            state.tenantId = null
        },
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
