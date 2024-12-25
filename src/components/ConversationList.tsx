"use client"

import Loader from "@/components/UI/loader/Loader"
import { useGetRecentChatHistoryQuery } from "@/lib/api"
import { tokens } from "@/theme"
import { sortConversations } from "@/utils/sortConversations"
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/navigation" // Используем навигацию App Router
import React from "react"

const ConversationList: React.FC = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { data: recentChatHistory, isLoading, error } = useGetRecentChatHistoryQuery()
    const router = useRouter() // Теперь это из next/navigation

    if (isLoading) return <Loader isOverlay={true} />
    if (error) return <Typography color="error">Error loading conversations</Typography>

    const sortedConversations = recentChatHistory ? sortConversations(recentChatHistory.data) : []

    const handleConversationClick = (conversationId: string) => {
        router.push(`/admin/conversations/reply/${conversationId}`)
    }

    return (
        <List>
            {sortedConversations.map(({ conversationId, latestMessage }) => (
                <Box
                    key={conversationId}
                    sx={{
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[600],
                        marginBottom: 2,
                        padding: 2,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: colors.blueAccent[700],
                        },
                    }}
                    onClick={() => handleConversationClick(conversationId)} 
                >
                    <ListItem disablePadding>
                        <ListItemText primary={conversationId} secondary={`Последнее сообщение: ${latestMessage}`} />
                    </ListItem>
                </Box>
            ))}
        </List>
    )
}

export default ConversationList
