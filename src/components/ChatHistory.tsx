import { useGetChatHistoryQuery } from "../lib/api"
import { formatChatHistory } from "../utils/format-chat-history"
import Loader from "./loader/Loader"

const ChatHistory = () => {
    const { data: chatHistoryData, isLoading, error } = useGetChatHistoryQuery(undefined)

    if (error) return <p>Ошибка при получении истории сообщений: {JSON.stringify(error)}</p>

    // Сортировка сообщений по дате
    const formattedChatHistory = chatHistoryData ? formatChatHistory(chatHistoryData) : null

    return (
        <div className="mt-4">
            {isLoading ? (
                <Loader />
            ) : (
                formattedChatHistory && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">История сообщений</h2>
                        <p className="mb-2">Всего сообщений: {formattedChatHistory.total}</p>
                        <div className="space-y-4">
                            {formattedChatHistory.messages.map((message, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex justify-end mb-1">
                                        <div className="bg-blue-500 text-white p-2 rounded-xl max-w-[70%]">
                                            <p className="font-semibold">{message.question}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-gray-200 p-2 rounded-xl max-w-[70%]">
                                            <p className="font-semibold">{message.answer}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-5 ml-1">{message.created_at}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default ChatHistory
