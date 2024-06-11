/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { ID } from "appwrite"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import GetAllMessagesInRedux from "../helpers/getAllMessagesInRedux"
import { useRef } from "react"
import Delete from "./icons/Delete"
import DeleteSession from "./modals/DeleteSession"
import databaseService from "../services/appwrite/database"

function SideBar({ isVisible, setToggle }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sidebarRef = useRef(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [sessionToBeDeleted, setsessionToBeDeleted] = useState('')

    const openModal = () => {
        setModalOpen(true);
    };

    let sessions = useSelector(state => state.chatSessionsReducer)

    sessions = Object.keys(sessions).map(chatSession => (
        sessions[chatSession][0]
    )).splice(0, 6) // Limits the number of sessions in Sidebar

    function handleClick() {
        navigate(`/chats/${ID.unique()}`)
    }

    async function handleDeleteSession() {
        setLoadingDelete(true)

        await databaseService.deleteMessagesBySessionId(sessionToBeDeleted)

        setLoadingDelete(false)
        setModalOpen(false)
    }

    useEffect(() => {
        GetAllMessagesInRedux({ dispatch })

        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setToggle(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <>
            <div ref={sidebarRef} className={`bg-gray-900 absolute z-auto top-14 left-0 border border-gray-800 p-3 rounded-md w-full max-w-xs transition-transform ${isVisible ? 'visible translate-x-2' : '-translate-x-[600px]'} duration-200`}>
                <div className="flex flex-col gap-2 mb-3">
                    <div onClick={handleClick}
                        className="bg-gray-400 cursor-pointer transition-colors duration-200 hover:bg-gray-500 p-3 rounded-md border border-gray-700">
                        <p className="text-base font-medium text-center text-gray-900">
                            Start a new Conversation
                        </p>
                    </div>
                </div>

                <p className="text-base text-gray-400 font-medium ">
                    Recent Chats
                </p>

                <div className="flex flex-col gap-2 mt-3">
                    {
                        sessions.map((session, index) => (
                            <a href={`/chats/${session.sessionId}`}
                                key={index}
                                className="bg-gray-800 flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-gray-700 px-3 py-2 rounded-md border border-gray-700">

                                <p className="text-base text-gray-400">
                                    {
                                        session.message.length > 30 ?
                                            session.message.slice(0, 30) +
                                            '...' :
                                            session.message
                                    }
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setsessionToBeDeleted(session.sessionId)
                                        openModal()
                                    }}>
                                    <Delete
                                        className="text-2xl active:text-gray-400 hover:text-gray-400"
                                        title='Delete Session'
                                    />
                                </button>
                            </a>
                        ))
                    }
                </div>
            </div>
            <DeleteSession
                modalOpen={modalOpen}
                handleDelete={handleDeleteSession}
                setModalOpen={setModalOpen}
                loading={loadingDelete}
            />
        </>
    )
}

export default SideBar