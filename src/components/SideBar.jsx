/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { ID } from "appwrite"
import { Link } from "react-router-dom"

function SideBar({ isVisible }) {
    let sessions = useSelector(state => state.chatSessionsReducer)

    sessions = Object.keys(sessions).map(chatSession => (
        sessions[chatSession][0]
    )).splice(0, 6) // Limits the number of sessions in Sidebar

    return (
        <div className={`bg-gray-900 absolute z-auto top-14 left-0 border border-gray-800 p-3 rounded-md w-full max-w-xs transition-transform ${isVisible ? 'visible translate-x-2' : '-translate-x-[600px]'} duration-200`}>
            <div className="flex flex-col gap-2 mb-3">
                <Link to={`/chats/${ID.unique()}`}
                    className="bg-gray-400 cursor-pointer transition-colors duration-200 hover:bg-gray-500 p-3 rounded-md border border-gray-700">
                    <p className="text-base font-medium text-center text-gray-900">
                        Start a new Conversation
                    </p>
                </Link>
            </div>

            <p className="text-base text-gray-400 font-medium ">
                Recent Chats
            </p>

            <div className="flex flex-col gap-2 mt-3">
                {
                    sessions.map((session, index) => (
                        <a href={`/chats/${session.sessionId}`}
                            key={index}
                            className="bg-gray-800 cursor-pointer transition-colors duration-200 hover:bg-gray-700 p-3 rounded-md border border-gray-700">

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