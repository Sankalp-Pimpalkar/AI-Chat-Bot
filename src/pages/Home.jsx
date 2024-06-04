import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getAllMessagesInState } from "../redux/reducers/chatSessionsReducer"
import { currentUser } from "../redux/reducers/authReducer"
import authService from "../services/appwrite/auth"
import databaseService from "../services/appwrite/database"

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            const user = await authService.getCurrentUser()
            const messages = await databaseService.getAllMessagesByUserId({
                userId: user.$id
            })

            dispatch(currentUser(user))
            messages.length && dispatch(getAllMessagesInState(messages))
        })()

    }, [])

    return (
        <div className="w-full h-full min-h-screen bg-gray-950">
            <Navbar />

            <div className="container mx-auto py-5 px-3 text-gray-200">
                <Outlet />
            </div>
        </div>
    )
}

export default Home