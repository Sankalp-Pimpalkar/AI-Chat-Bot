import { useSelector } from "react-redux"

function SideBar() {
    let sessions = useSelector(state => state.chatSessionsReducer)

    sessions = Object.keys(sessions).map(chatSession => (
        sessions[chatSession][0]
    ))
    console.log(sessions)

    return (
        <div className="bg-gray-900 absolute top-14 left-0 border border-gray-800 p-3 rounded-md w-full max-w-sm">
            <p className="text-base text-gray-400 font-medium ">
                Recent Chats
            </p>

            <div className="flex flex-col gap-2 mt-3">
                {
                    sessions.map((session, index) => (
                        <a href={`/${session.sessionId}`}
                            key={index}
                            className="bg-gray-800 cursor-pointer transition-all duration-200 hover:bg-gray-700 p-3 rounded-md border border-gray-700">

                            <p className="text-base text-gray-400">
                                {session.message}
                            </p>

                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar