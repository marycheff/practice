"use client"

import { useEffect } from "react"

const ChatBot = () => {
    useEffect(() => {
        const scriptId = "chatbot-script"

        // Функция для загрузки скрипта
        const loadScript = () => {
            const script = document.createElement("script")
            script.async = true
            script.id = scriptId
            script.src = "https://chatbot-dist.s3.us-east-2.amazonaws.com/chatbot/fullpage_build_chatbot.js"
            script.setAttribute("chatbotId", `${process.env.NEXT_PUBLIC_BOT_ID}`)
            script.setAttribute("targetId", "chat-container")
            document.body.appendChild(script)
        }

        // Проверка, загружен ли скрипт
        if (!document.getElementById(scriptId)) {
            loadScript()
        }

        // Очистка
        return () => {
            const existingScript = document.getElementById(scriptId)
            if (existingScript) {
                document.body.removeChild(existingScript)
            }
        }
    }, [])

    return (
        <div
            id="chat-container"
            className="w-full max-w-4xl h-[543px] bg-white shadow-lg rounded-lg p-4 flex items-center justify-center relative"></div>
    )
}

export default ChatBot
