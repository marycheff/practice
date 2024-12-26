"use client"

import Loader from "@/components/UI/loader/Loader"
import { useGetRecentChatHistoryQuery } from "@/lib/api"
import { tokens } from "@/theme"
import { sortConversations } from "@/utils/sortConversations"
import { List, ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/navigation"
import React from "react"

const ConversationList: React.FC = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // Получение беседы
    const { data: recentChatHistory, isLoading, error } = useGetRecentChatHistoryQuery()
    const router = useRouter()

    if (isLoading) return <Loader isOverlay={true} />
    if (error) return <Typography variant="h2">Ошибка загрузки Бесед</Typography>

    const sortedConversations = recentChatHistory ? sortConversations(recentChatHistory.data) : []

    const handleConversationClick = (conversationId: string) => {
        router.push(`/admin/conversations/${conversationId}`)
    }

    return (
        <List>
            {sortedConversations.map(({ conversationId, latestMessage }) => (
                <ListItem
                    key={conversationId}
                    disablePadding
                    onClick={() => handleConversationClick(conversationId)}
                    sx={{
                        borderRadius: "8px",
                        backgroundColor: colors.blueAccent[600],
                        marginBottom: 2,
                        padding: 2,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: colors.blueAccent[700],
                        },
                    }}>
                    <ListItemText
                        primary={`Диалог: ${conversationId}`}
                        secondary={`Последнее сообщение: ${latestMessage}`}
                    />
                </ListItem>
            ))}
        </List>
    )
}

export default ConversationList
