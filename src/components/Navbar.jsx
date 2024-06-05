/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom"
import { useState } from "react"
import Hide from "./icons/Hide"
import Show from "./icons/Show"
import Write from "./icons/Write"
import Logout from "./Logout"
import SideBar from "./SideBar"
import { ID } from "appwrite"
import { useNavigate } from "react-router-dom"

function Navbar() {

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/chats/${ID.unique()}`)
    }

    return (
        <div className="border-b z-auto bg-slate-950 border-gray-800 p-3 sticky top-0">
            <div className="relative flex items-center justify-between w-full container mx-auto px-2">

                <div className="text-gray-600 flex items-center gap-6 px-0">
                    <div className=" w-full" onClick={() => setToggleSidebar(!toggleSidebar)}>
                        {
                            toggleSidebar ?
                                (<Show className="text-2xl md:text-3xl cursor-pointer" />) :
                                (<Hide className="text-2xl md:text-3xl cursor-pointer" />)
                        }
                        <SideBar isVisible={toggleSidebar} />
                    </div>
                    <div onClick={handleClick}>
                        <Write className="text-2xl md:text-3xl cursor-pointer" />
                    </div>
                </div>

                <a href="/" className="text-2xl md:text-3xl font-bold text-gray-400 hover:text-gray-300 transition-all duration-500 cursor-pointer">
                    Gemini AI
                </a>

                <div>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default Navbar