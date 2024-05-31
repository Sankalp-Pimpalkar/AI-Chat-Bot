import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import databaseService from "../services/appwrite/database"
import { useSelector } from "react-redux"
import Message from "./Message"
import Loader from "./icons/Loader"

function ChatSession() {

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const { sessionId } = useParams()
    const userId = useSelector(state => state.authReducer?.userData?.$id)

    useEffect(() => {
        if (userId) {
            (async () => {
                const messages = await databaseService.getMessagesBySessionId({
                    userId,
                    sessionId
                })

                if (messages) {
                    setChats(messages)
                }
                setLoading(false)
            })();
        }
    }, [userId, sessionId])
    console.log(chats)

    if (loading) {
        return (
            <div className="flex justify-center">
                <Loader className="text-4xl text-blue-500" />
            </div>
        )
    } else {
        return (
            <div className="w-full max-w-6xl flex flex-col gap-8 mx-auto">
                {
                    chats.map((chat, index) => (
                        <Message key={index} sender={chat.sender} message={chat.message} />
                    ))
                }
            </div>
        )
    }
}

export default ChatSession