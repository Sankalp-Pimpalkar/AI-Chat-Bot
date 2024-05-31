/* eslint-disable react/prop-types */
import Google from "./icons/Google"
import User from "./icons/User"

function Message({ sender, message }) {
    return (
        <div className="flex items-start gap-3 antialiased w-full max-w-3xl">
            <div className="bg-gray-300 px-1 flex items-center justify-center rounded-full">
                {
                    sender === 'gemini' ?
                        (
                            <Google className="text-slate-950 text-2xl" />
                        ) :
                        (
                            <User className="text-slate-950 text-2xl" />
                        )
                }

            </div>

            <div className="flex items-start flex-col gap-1">
                <h1 className="text-lg font-bold text-gray-300">
                    {sender.charAt(0).toUpperCase() + sender.slice(1)}
                </h1>

                <p className="text-gray-400">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Message