import authService from "../services/appwrite/auth"
import { useDispatch } from "react-redux"
import { logout } from "../redux/reducers/authReducer"
import { deleteAllMessagesInState } from "../redux/reducers/chatSessionsReducer"
import { useNavigate } from "react-router-dom"

function Logout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleLogout() {
        dispatch(deleteAllMessagesInState())
        dispatch(logout())
        await authService.logout()
        navigate('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="bg-gray-400 hover:bg-gray-300 text-gray-800 text-sm px-3 py-1.5 rounded-md">
            Logout
        </button>
    )
}

export default Logout