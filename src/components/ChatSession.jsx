import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../services/appwrite/database";
import { useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./icons/Loader";
import BottomBar from "./BottomBar";
import GenerateTextGemini from "../services/gemini/function";

function ChatSession() {
    const { sessionId } = useParams();
    const messageRef = useRef();
    const [chats, setChats] = useState([]);
    const [loadingChats, setLoadingChats] = useState(false);
    const [loadingPromptResponse, setLoadingPromptResponse] = useState(false);
    const [message, setMessage] = useState({
        userId: '',
        sessionId,
        sender: 'user',
        message: ''
    });
    const userId = useSelector(state => state.authReducer?.userData?.$id);

    useEffect(() => {
        if (userId) {
            setLoadingChats(true);
            (async () => {
                const messages = await databaseService.getMessagesBySessionId({
                    userId,
                    sessionId
                });

                if (messages) {
                    setChats(messages);
                    setMessage(prevMessage => ({ ...prevMessage, userId }));
                }
                setLoadingChats(false);
            })();
        }

        return () => {
            setChats([]);
        };
    }, [userId, sessionId]);

    useEffect(() => {
        const container = messageRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [chats]);
    async function handleSubmit() {
        if (message.message.trim()) {
            setLoadingPromptResponse(true);
            const newMessage = { ...message, userId };
            setChats(prevChats => [...prevChats, newMessage]);

            // Clear the input field
            setMessage(prevMessage => ({ ...prevMessage, message: '' }));

            await databaseService.addNewMessage(newMessage);

            const responseFromGemini = await GenerateTextGemini({
                chatHistory: [...chats, newMessage],
                prompt: newMessage.message
            });

            const messageResponseFromGemini = {
                userId,
                sessionId,
                message: String(responseFromGemini),
                sender: 'model'
            };

            setChats(prevChats => [...prevChats, messageResponseFromGemini]);
            setLoadingPromptResponse(false);

            await databaseService.addNewMessage(messageResponseFromGemini);
        }
    }
    function handleChange(inputValue) {
        setMessage(prevMessage => ({ ...prevMessage, message: inputValue }));
    }

    if (loadingChats) {
        return (
            <div className="flex justify-center">
                <Loader className="text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="w-full md:max-w-6xl h-full px-2 flex flex-col gap-8 mx-auto">
            <div ref={messageRef}
                className="w-full pb-20 h-[calc(100vh-110px)] overflow-y-auto flex flex-col gap-3 hide-scrollbar">
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
                loading={loadingPromptResponse}
            />
        </div>
    );
}

export default ChatSession;
