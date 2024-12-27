"use client"

import ChatBot from "@/components/ChatBotWidget"
import LoginModal from "@/components/LoginModal"
import { tokens } from "@/theme"
import { Box, Container, Typography, useTheme } from "@mui/material"

const Home = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                bgcolor: colors.primary[400],
            }}>
            <Container maxWidth="md">
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h2">Главная страница</Typography>
                    <Typography variant="h5">Тут можно пообщаться с ботом</Typography>
                    {/* <Button
                        component={Link}
                        href="/admin"
                        variant="contained"
                        sx={{ mt: 2, mb: 4, bgcolor: colors.greenAccent[600] }}>
                        Перейти в админ панель
                    </Button> */}
                    <Box sx={{ mt: 2 }}>
                        <LoginModal /> 
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <ChatBot />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Home
