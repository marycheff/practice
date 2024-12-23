"use client"

import Loader from "@/components/loader/Loader"
import { useAuth } from "@/hooks/useAuth"
import { tokens } from "@/theme"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"

const AdminPage = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const token = getCookie("token") as string
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { handleLogin, checkToken } = useAuth()
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const isTokenValid = await checkToken()
                if (!isTokenValid) {
                    console.log("Токен не валиден")
                    await handleLogin()
                }
                setError(null)
            } catch (error: unknown) {
                setError(`Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`)
            } finally {
                setLoading(false)
            }
        }
        initializeAuth()
    }, [handleLogin, checkToken])

    if (loading) return <Loader isOverlay={true} />
    if (error) return <Typography color={colors.redAccent[500]}>{error}</Typography>

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    p: 3,
                    mt: 4,
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                }}>
                <Typography variant="h4" color={colors.grey[100]}>
                    Админ панель
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        mb: 2,
                        display: "block",
                        wordBreak: "break-all",
                        color: colors.greenAccent[400],
                    }}>
                    {token}
                </Typography>
            </Box>
        </Container>
    )
}

export default AdminPage
