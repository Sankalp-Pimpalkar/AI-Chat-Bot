/* eslint-disable react/prop-types */
import { useState } from "react"
import Hide from "./icons/Hide"
import Show from "./icons/Show"
import Write from "./icons/Write"
import Logout from "./Logout"
import SideBar from "./SideBar"

function Navbar() {

    const [toggleSidebar, setToggleSidebar] = useState(false)

    return (
        <div className="border-b border-gray-800 p-3">
            <div className="relative flex items-center justify-between w-full container mx-auto px-2">

                <div className="text-gray-600 flex items-center gap-6 px-0">
                    <div className=" w-full" onClick={() => setToggleSidebar(!toggleSidebar)}>
                        {
                            toggleSidebar ?
                                (<Show className="text-2xl md:text-3xl cursor-pointer" />) :
                                (<Hide className="text-2xl md:text-3xl cursor-pointer" />)
                        }
                        {
                            toggleSidebar && <SideBar />
                        }
                    </div>
                    <Write className="text-2xl md:text-3xl cursor-pointer" />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-400 hover:text-gray-300 transition-all duration-500 cursor-pointer">
                    Gemini AI
                </h1>

                <div>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default Navbar