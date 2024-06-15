/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react"
import Google from "./icons/Google"
import User from "./icons/User"
import Copy from "./icons/Copy"

function Message({ sender, message }) {

    const textRef = useRef()
    const messageRef = useRef()
    const markedText = message
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // Convert ### headers to <h3>
        .replace(/^## (.*$)/gim, '<h2>$1</h2>') // Convert ## headers to <h2>
        .replace(/^# (.*$)/gim, '<h1>$1</h1>') // Convert # headers to <h1>
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>') // Convert **bold** to <strong>
        .replace(/\*(.*?)\*/gim, '<em>$1</em>'); // Convert *italic* to <em>

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = useCallback(() => {
        const text = textRef.current
        navigator.clipboard.writeText(text.textContent)
        setIsCopied(true)
    }, [])

    useEffect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                setIsCopied(false)
            }, 5000)

            return () => clearTimeout(timeout)
        }
    }, [isCopied])

    // useEffect(() => {
    //     console.log(messageRef.current.scrollHeight)
    //     console.log(chats)
    //     messageRef.current.scrollTop = messageRef.current.scrollHeight
    // }, [])


    return (
        <div ref={messageRef} className="flex items-start gap-3 antialiased w-full max-w-3xl">
            <div className="bg-gray-300 px-1 flex items-center justify-center rounded-full">
                {
                    sender === 'model' ?
                        (
                            <Google className="text-slate-950 text-xl" />
                        ) :
                        (
                            <User className="text-slate-950 text-xl" />
                        )
                }

            </div>

            <div className="flex items-start flex-col gap-1">
                <h1 className="text-lg font-Roboto font-bold text-gray-300">
                    {
                        sender === 'model' ? 'Gemini' : 'You'
                    }
                </h1>

                <p ref={textRef} className="text-gray-400 bg-gray-900 py-2 px-4 rounded-lg" dangerouslySetInnerHTML={{ __html: markedText }}>
                </p>

                <span className="py-1">
                    <div className="flex items-center gap-2">
                        <Copy onClick={handleCopy} className={`${isCopied && 'bx bxs-copy'} text-slate-600 text-lg cursor-pointer`} />
                        {
                            isCopied &&
                            <p className="text-sm text-slate-600">copied to clipboard</p>
                        }

                    </div>
                </span>
            </div>
        </div>
    )
}

export default Message