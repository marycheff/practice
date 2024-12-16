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
            script.setAttribute("chatbotId", "29daab97-8051-42e6-ae40-1322a29f85bf")
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
