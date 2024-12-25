import Loader from "@/components/UI/loader/Loader"
import { useTokenVerification } from "@/hooks/useTokenVerification"
import { useGetChatHistoryQuery } from "@/lib/api"
import { tokens } from "@/theme"
import { formatChatHistory } from "@/utils/format-chat-history"
import CachedIcon from "@mui/icons-material/Cached"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { useEffect } from "react"

const BotHistory = () => {
    const { data: chatHistoryData, isFetching, error, refetch } = useGetChatHistoryQuery()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const { verifyToken, loading } = useTokenVerification()

    const updateChatHistory = async () => {
        await verifyToken()
        refetch()
    }

    useEffect(() => {
        updateChatHistory()
    }, [])

    if (loading || isFetching) return <Loader isOverlay={true} />

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error) return <div>Error: {(error as any).message}</div>

    // Сортировка сообщений по дате
    const formattedChatHistory = chatHistoryData ? formatChatHistory(chatHistoryData) : null

    if (isFetching || loading) return <Loader isOverlay={true} />

    return (
        <>
            {formattedChatHistory && (
                <Box
                    sx={{
                        p: 3,
                        mt: 4,
                        backgroundColor: colors.primary[400],
                        color: colors.grey[100],
                    }}>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <IconButton onClick={updateChatHistory}>
                            <CachedIcon />
                        </IconButton>
                    </Box>
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
                                            {message.answer.trim() === "I don't know." ? (
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
                </Box>
            )}
        </>
    )
}

export default BotHistory
