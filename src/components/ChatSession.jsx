import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import databaseService from "../services/appwrite/database"
import { useSelector } from "react-redux"
import Message from "./Message"
import Loader from "./icons/Loader"
import BottomBar from "./BottomBar"
import GenerateTextGemini from "../services/gemini/function"

function ChatSession() {

    // Todo : Scroll to bottom is not working properly

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({
        userId: '',
        sessionId: '',
        sender: 'user',
        message: ''
    })
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
                    setMessage({ ...message, userId, sessionId })
                }
                setLoading(false)
            })();
        }
    }, [userId, sessionId])


    async function handleSubmit() {
        setChats(chats => [...chats, message])
        await databaseService.addNewMessage(message)

        const responseFromGemini = await GenerateTextGemini({
            chatHistory: chats,
            prompt: message.message
        })

        const messageResponseFromGemini = {
            userId,
            sessionId,
            message: String(responseFromGemini),
            sender: 'model'
        }

        setChats(chats => [...chats, messageResponseFromGemini])
        await databaseService.addNewMessage(messageResponseFromGemini)

        // Clearing text input from input field
        setMessage({ ...message, message: '' })
    }

    function handleChange(inputValue) {
        setMessage({ ...message, message: inputValue })
    }

    if (loading) {
        return (
            <div className="flex justify-center">
                <Loader className="text-4xl text-blue-500" />
            </div>
        )
    } else {
        return (
            <div className="w-full md:max-w-6xl h-full pb-20 flex flex-col gap-8 mx-auto">
                <div>
                    {
                        chats.map((chat, index) => (
                            <Message key={index} sender={chat.sender} message={chat.message} />
                        ))
                    }
                </div>
                <BottomBar
                    value={message.message}
                    handleClick={handleSubmit}
                    handleOnchange={handleChange}
                />
            </div>
        )
    }
}

export default ChatSession