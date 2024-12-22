"use client"

import { useEffect } from "react"

const ChatBot = () => {
    useEffect(() => {
        const scriptId = "chatbot-script"

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script")
            script.async = true
            script.id = scriptId
            script.src = "https://chatbot-dist.s3.us-east-2.amazonaws.com/chatbot/fullpage_build_chatbot.js"
            script.setAttribute("chatbotId", "bed0cfe4-3120-4536-a479-f28bd579848e")
            script.setAttribute("targetId", "chat-container")
            document.body.appendChild(script)
        }
    }, [])

    return (
        <div
            id="chat-container"
            className="w-full max-w-4xl h-[543px] bg-white shadow-lg rounded-lg p-4 flex items-center justify-center relative"></div>
    )
}

export default ChatBot
