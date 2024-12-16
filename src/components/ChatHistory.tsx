import { useGetChatHistoryQuery } from "../lib/api"
import { formatChatHistory } from "../utils/format-chat-history"
import Loader from "./loader/Loader"

const ChatHistory = () => {
    const { data: chatHistoryData, isLoading, error } = useGetChatHistoryQuery(undefined)

    if (isLoading) return <Loader />

    if (error) return <p>Ошибка при получении истории сообщений: {JSON.stringify(error)}</p>

    // Сортировка сообщений по дате
    const formattedChatHistory = chatHistoryData ? formatChatHistory(chatHistoryData) : null

    return (
        <div className="mt-4">
            {formattedChatHistory && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">История сообщений</h2>
                    <p className="mb-2">Всего сообщений: {formattedChatHistory.total}</p>
                    <ul className="space-y-4">
                        {formattedChatHistory.messages.map((message, index) => (
                            <li key={index} className="border-b pb-2">
                                <p className="font-semibold">{message.question}</p>
                                <p>{message.answer}</p>
                                <p className="text-xs text-gray-500">{message.created_at}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ChatHistory
