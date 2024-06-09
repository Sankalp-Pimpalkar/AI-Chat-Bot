import { useEffect } from "react"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import GetCurrentUserInRedux from "../helpers/getCurrentUserInRedux"

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        GetCurrentUserInRedux({ dispatch })
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