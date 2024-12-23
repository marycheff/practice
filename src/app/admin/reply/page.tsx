"use client"
import Loader from "@/components/loader/Loader"
import { useAuth } from "@/hooks/useAuth"
import { useLiveAgentReplyMutation } from "@/lib/api"
import { tokens } from "@/theme"
import { Box, Button, Container, TextField, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"

const LiveAgentTestPage = () => {
    const [reply, setReply] = useState("")
    const [sendLiveAgentReply, { isLoading }] = useLiveAgentReplyMutation()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [loading, setLoading] = useState(true)
    const { handleLogin, checkToken } = useAuth()

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const isTokenValid = await checkToken()
                if (!isTokenValid) {
                    await handleLogin()
                }
            } finally {
                setLoading(false)
            }
        }
        initializeAuth()
    }, [handleLogin, checkToken])

    if (loading) return <Loader isOverlay={true} />
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!reply.trim()) return

        try {
            await sendLiveAgentReply({
                reply,
                conversation_id: process.env.NEXT_PUBLIC_CONVERSATION_ID || "",
            }).unwrap()
            setReply("")
        } catch (err) {
            console.error("Failed to send live agent reply:", err)
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        multiline
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: colors.primary[300], // Цвет рамки
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: colors.primary[100], // Цвет рамки при фокусе
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            backgroundColor: colors.greenAccent[500],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[600],
                            },
                        }}>
                        {isLoading ? "Отправка" : "Отправить"}
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default LiveAgentTestPage
