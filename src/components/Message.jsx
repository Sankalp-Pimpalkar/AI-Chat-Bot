/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import Google from "./icons/Google"
import User from "./icons/User"
import Copy from "./icons/Copy"

function Message({ sender, message }) {

    const messageRef = useRef()
    const promptRef = useRef(null)
    const [isCopied, setIsCopied] = useState(false)

    function handleCopy() {

        const text = messageRef.current
        navigator.clipboard.writeText(text.textContent)
        setIsCopied(true)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsCopied(false)
        }, 5000)

        // return clearTimeout(timeout)
    }, [handleCopy])


    useEffect(() => {
        promptRef.current?.scrollTo({ top: promptRef.current.scrollHeight, behavior: 'smooth' })
    }, [message])

    return (
        <div ref={promptRef} className="flex items-start gap-3 antialiased w-full max-w-3xl">
            <div className="bg-gray-300 px-1 flex items-center justify-center rounded-full">
                {
                    sender === 'model' ?
                        (
                            <Google className="text-slate-950 text-2xl" />
                        ) :
                        (
                            <User className="text-slate-950 text-2xl" />
                        )
                }

            </div>

            <div className="flex items-start flex-col gap-1">
                <h1 className="text-lg font-Roboto font-bold text-gray-300">
                    {sender.charAt(0).toUpperCase() + sender.slice(1)}
                </h1>

                <p ref={messageRef} className="text-gray-400 bg-gray-900 py-2 px-4 rounded-lg" dangerouslySetInnerHTML={{ __html: message }}>
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