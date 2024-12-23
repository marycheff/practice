import { Box, Typography, useTheme } from "@mui/material"
import { useGetChatHistoryQuery } from "../lib/api"
import { tokens } from "../theme"
import { formatChatHistory } from "../utils/format-chat-history"
import Loader from "./loader/Loader"

const ChatHistory = () => {
    const { data: chatHistoryData, isLoading, error } = useGetChatHistoryQuery(undefined)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    if (error) return <p>Ошибка при получении истории сообщений: {JSON.stringify(error)}</p>

    // Сортировка сообщений по дате
    const formattedChatHistory = chatHistoryData ? formatChatHistory(chatHistoryData) : null

    return (
        <div className="mt-4">
            {isLoading ? (
                <Loader isOverlay={true} />
            ) : (
                formattedChatHistory && (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {formattedChatHistory.messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: colors.primary[600],
                                    borderRadius: "15px",
                                    p: 2,
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
                                            {message.answer.trim() == "I don't know." ? (
                                                <Typography>[нет ответа от бота]</Typography>
                                            ) : (
                                                <Typography>{message.answer}</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                )}
                                <Typography variant="caption" color={colors.grey[600]} ml={0.3}>
                                    {message.created_at}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )
            )}
        </div>
    )
}

export default ChatHistory
