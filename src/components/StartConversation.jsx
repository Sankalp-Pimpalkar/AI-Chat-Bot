import { ID } from "appwrite"
import { useNavigate } from "react-router-dom"

function StartConversation() {

    const sessionId = ID.unique()
    const navigate = useNavigate()
    // React's useID suckss

    function handleClick() {
        navigate(`/chats/${sessionId}`)
    }

    return (
        <div className="w-full h-96 flex items-center justify-center">
            <button
                onClick={handleClick}
                className="bg-gray-400 hover:bg-gray-300 active:bg-gray-400 text-slate-800 font-medium py-2 px-4 rounded-lg"
            >
                Start Conversation with Gemini
            </button>
        </div>
    )
}

export default StartConversation