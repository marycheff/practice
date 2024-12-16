export interface LoginResponse {
    status: "success" | "error"
    data: {
        msg: string
        token: string
        user_tenant_bot_count: number
        email: string
        tenant_id: string
    }
}
