import ChatBot from "../components/ChatBot"

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center mb-6">
                <h1>Главная страница</h1>
                <p className="text-lg text-gray-600 mt-2">Тут можно пообщаться с ботом</p>
            </div>
            <ChatBot />
        </div>
    )
}

export default Home
