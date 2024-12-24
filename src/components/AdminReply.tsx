"use client"
import { useChatContext } from "@/contexts/ChatContext"
import { tokens } from "@/theme"
import { Box, Button, TextField, useTheme } from "@mui/material"
import React, { useState } from "react"

const AdminReply: React.FC = () => {
    const [reply, setReply] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { sendMessage } = useChatContext()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!reply.trim() || isLoading) return

        setIsLoading(true)
        try {
            await sendMessage(reply)
            setReply("") 
        } catch (err) {
            console.error("Failed to send live agent reply:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
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
                                borderColor: colors.primary[300],
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: colors.primary[100],
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
    )
}

export default AdminReply
