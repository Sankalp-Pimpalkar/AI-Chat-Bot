import { SideBar } from "../components"
import { useDispatch } from "react-redux"
import authService from "../services/appwrite/auth"
import { login } from "../redux/reducers/authReducer"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"


function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then(userData => {
                dispatch(login(userData))
            })
    }, [])

    return (
        <div className="w-full h-screen flex bg-gray-300">
            <SideBar />
            <Outlet />
        </div>
    )
}

export default Home