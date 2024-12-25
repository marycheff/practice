import Loader from "@/components/UI/loader/Loader"
import { useChatContext } from "@/contexts/ChatContext"
import { tokens } from "@/theme"
import { formatConversationHistory } from "@/utils/formatChatHistory"
import CachedIcon from "@mui/icons-material/Cached"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import React from "react"

const ChatConversationHistory: React.FC = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // Получение истории чата
    const { chatHistory, isLoading, error, refreshChatHistory } = useChatContext()

    if (error) {
        if ("originalStatus" in error && error.originalStatus === 404) {
            return <p>Неверный ConversationID</p>
        }
        return <p>Ошибка при получении истории сообщений: {JSON.stringify(error)}</p>
    }
    const formattedChatHistory = chatHistory ? formatConversationHistory(chatHistory) : null

    return (
        <Box
            sx={{
                px: 3,
                paddingBottom: 4,
                paddingTop: 1,
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
            }}>
            <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={refreshChatHistory}>
                    <CachedIcon />
                </IconButton>
            </Box>
            {isLoading ? (
                <Loader isOverlay={false} text="Загрузка сообщений" />
            ) : formattedChatHistory && formattedChatHistory.messages.length > 0 ? (
                <Box
                    sx={{
                        borderRadius: "15px",
                        backgroundColor: colors.primary[600],
                        p: 2,
                    }}>
                    {formattedChatHistory.messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                my: 2,
                            }}>
                            {message.question && (
                                <Box display="flex" justifyContent="flex-end" mb={1}>
                                    <Box
                                        sx={{
                                            backgroundColor: colors.blueAccent[600],
                                            color: colors.grey[100],
                                            p: 1,
                                            borderRadius: "8px",
                                            maxWidth: "70%",
                                        }}>
                                        <Typography>{message.question}</Typography>
                                    </Box>
                                </Box>
                            )}
                            {message.answer && (
                                <Box display="flex" justifyContent="flex-start">
                                    <Box
                                        sx={{
                                            backgroundColor: colors.greenAccent[700],
                                            color: colors.grey[100],
                                            p: 1,
                                            borderRadius: "8px",
                                            maxWidth: "70%",
                                        }}>
                                        {message.answer.trim() === "I don't know." ||
                                        message.answer.trim() === "Sorry! I'm not sure what you're saying." ? (
                                            <Typography>[бот не знает ответ]</Typography>
                                        ) : (
                                            <Typography>{message.answer}</Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                            <Typography variant="caption" color={colors.grey[600]} ml={0.3}>
                                {message.created_at} |{" "}
                                {message.chat_via === "bot"
                                    ? "бот"
                                    : message.chat_via === "live_chat"
                                    ? "админ"
                                    : message.chat_via}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="h2" color={colors.grey[500]} textAlign="center">
                    Нет сообщений
                </Typography>
            )}
        </Box>
    )
}

export default ChatConversationHistory
