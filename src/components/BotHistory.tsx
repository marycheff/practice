import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { useGetChatHistoryQuery } from "@/lib/api"
import { tokens } from "@/theme"
import { formatChatHistory } from "@/utils/formatChatHistory"
import CachedIcon from "@mui/icons-material/Cached"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { ReactNode } from "react"

const BotHistory = () => {
    // Настройка темы
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // Получение истории чата
    const { data: chatHistoryData, isFetching, error, refetch } = useGetChatHistoryQuery()

    // Проверка токена
    const { verifyToken, loading } = useTokenVerification()
    const updateChatHistory = async () => {
        await verifyToken()
        refetch()
    }

    if (error) return <div>Error: {error as ReactNode}.</div>

    // Сортировка сообщений по дате
    const formattedChatHistory = chatHistoryData ? formatChatHistory(chatHistoryData) : null
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
            {loading || isFetching ? (
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
                                        {message.answer.trim() === "I don't know." ? (
                                            <Typography>[бот не знает ответ]</Typography>
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
            ) : (
                <Typography variant="h2" color={colors.grey[500]} textAlign="center">
                    Нет сообщений
                </Typography>
            )}
        </Box>
    )
}

export default BotHistory
