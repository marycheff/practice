"use client"

import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { tokens } from "@/theme"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

const AdminPage = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // Проверка токена
    const { verifyToken, loading } = useTokenVerification()
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
    useEffect(() => {
        const checkAuth = async () => {
            const isVerified = await verifyToken()
            setIsTokenValid(isVerified)
        }
        checkAuth()
    }, [verifyToken])

    if (loading || isTokenValid === null) {
        return <Loader isOverlay={true} />
    }

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
                {isTokenValid && (
                    <Typography
                        variant="caption"
                        sx={{
                            mb: 2,
                            display: "block",
                            wordBreak: "break-all",
                            color: colors.greenAccent[400],
                        }}>
                        Вы авторизованы
                    </Typography>
                )}
            </Box>
        </Container>
    )
}

export default AdminPage
