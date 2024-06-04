import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="w-full antialiased h-screen flex items-center justify-center bg-slate-950">
            <div className="w-full max-w-md bg-slate-950 text-center md:border border-gray-700 rounded-md p-5">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout