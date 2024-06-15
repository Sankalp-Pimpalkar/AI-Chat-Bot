import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import databaseService from "../services/appwrite/database"
import { useSelector } from "react-redux"
import Message from "./Message"
import Loader from "./icons/Loader"
import BottomBar from "./BottomBar"
import GenerateTextGemini from "../services/gemini/function"

function ChatSession() {

    // Todo : Scroll to bottom is not working properly

    const { sessionId } = useParams()
    const messageRef = useRef()
    const [chats, setChats] = useState([])
    const [loadingChats, setLoadingChats] = useState(true)
    const [loadingPromptResponse, setloadingPromptResponse] = useState(false)
    const [message, setMessage] = useState({
        userId: '',
        sessionId,
        sender: 'user',
        message: ''
    })
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
                    setMessage({ ...message, userId })
                }
                setLoadingChats(false)

            })();
        }

        // Cleanup function to reset state when sessionId changes
        return () => {
            setChats([]);
            setLoadingChats(true);
        };
    }, [userId, sessionId])

    async function handleSubmit(e) {
        e.stopPropagation()
        if (message.message.trim()) {

            setloadingPromptResponse(true)
            setChats(chats => [...chats, message])
            const inputMessage = message.message
            // Clearing text input from input field
            setMessage({ ...message, message: '' })

            await databaseService.addNewMessage(message)

            const responseFromGemini = await GenerateTextGemini({
                chatHistory: chats,
                prompt: inputMessage
            })

            const messageResponseFromGemini = {
                userId,
                sessionId,
                message: String(responseFromGemini),
                sender: 'model'
            }

            setChats(chats => [...chats, messageResponseFromGemini])
            setloadingPromptResponse(false)

            await databaseService.addNewMessage(messageResponseFromGemini)
        }
    }

    function handleChange(inputValue) {
        setMessage({ ...message, message: inputValue })
    }

    if (loadingChats) {
        return (
            <div className="flex justify-center">
                <Loader className="text-4xl text-blue-500" />
            </div>
        )
    } else {
        return (
            <div className="w-full md:max-w-6xl h-full pb-20 px-2 flex flex-col gap-8 mx-auto">
                <div className="w-full h-fit flex flex-col gap-3">
                    {
                        chats.map((chat, index) => (
                            <Message key={index} chats={chats} sender={chat.sender} message={chat.message} />
                        ))
                    }
                </div>
                <BottomBar
                    value={message.message}
                    handleClick={handleSubmit}
                    handleOnchange={handleChange}
                    loading={loadingPromptResponse}
                />
            </>
        )
    }
}

export default ChatSession