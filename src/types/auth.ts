export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    status: string
    data: {
        msg: string
        token: string
        user_tenant_bot_count: number
        email: string
        tenant_id: string
    }
}
export interface AuthState {
    token: string | null
    isAuthenticated: boolean
    email: string | null
    tenantId: string | null
}
