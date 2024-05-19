import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-md text-center md:border border-gray-400 rounded-md p-5">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout