import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { useGetConversationHistoryQuery } from "@/lib/api"
import { tokens } from "@/theme"
import { formatConversationHistory } from "@/utils/formaHistory"
import CachedIcon from "@mui/icons-material/Cached"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { FC } from "react"

const ChatConversationHistory: FC<{ conversationId: string }> = ({ conversationId }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { data: chatHistoryData, isFetching, error, refetch } = useGetConversationHistoryQuery(conversationId)

    const { verifyToken, isLoading } = useTokenVerification()
    const updateChatHistory = async () => {
        await verifyToken()
        refetch()
    }
    if (error) {
        if ("originalStatus" in error && error.originalStatus === 404) {
            return (
                <Typography variant="h4" textAlign="center" mt={6} sx={{ color: colors.redAccent[400] }}>
                    Неверный ConversationID
                </Typography>
            )
        }
        return <Typography>Ошибка при получении истории сообщений: {JSON.stringify(error)}</Typography>
    }
    const formattedChatHistory = chatHistoryData ? formatConversationHistory(chatHistoryData) : null
    console.log(chatHistoryData)
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
                <IconButton onClick={updateChatHistory}>
                    <CachedIcon />
                </IconButton>
            </Box>
            {isLoading || isFetching ? (
                <Loader isOverlay={false} text="Загрузка сообщений" />
            ) : chatHistoryData && formattedChatHistory && formattedChatHistory.messages.length > 0 ? (
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
                                my: 1,
                            }}>
                            {message.question && (
                                <Box display="flex" justifyContent="flex-end" mb={1}>
                                    <Box
                                        sx={{
                                            backgroundColor: colors.blueAccent[600],
                                            color: colors.grey[100],
                                            p: 1,
                                            mb: 2,
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
                                        {/* Обработка ответа бота */}
                                        {message.answer.trim() === "I don't know." ||
                                        message.answer.trim() === "Sorry! I'm not sure what you're saying." ? (
                                            <Typography>[бот не знает ответ]</Typography>
                                        ) : (
                                            <Typography>{message.answer}</Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                            {/* Обработка отображения автора ответа */}
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
