import { Link } from "react-router-dom"

function WelcomePage() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-950">
            <div
                className="container mx-auto font-Poppins antialiased flex flex-col items-center px-10 md:px-0 text-center justify-center">
                <div>
                    <p className="mt-2 text-sm md:text-xl text-center text-gray-500">
                        Your personal guide and helper, here to assist you with anything you need.
                    </p>
                    <h1 className="text-4xl md:text-6xl mt-6 text-gray-400 font-bold tracking-wide flex items-center gap-3">
                        Welcome to Your AI Assistant
                    </h1>
                </div>

                <div className="mt-12 md:mt-16">
                    <h2 className="text-sm md:text-xl font-medium w-full max-w-2xl text-center text-gray-600">
                        Get started by logging in or signing up to unlock the full potential of your AI assistant.
                    </h2>

                    <div className="w-full flex gap-5 items-center justify-center mt-6 font-Roboto">
                        <Link to='/signup' className="bg-gray-900 border border-gray-800 text-center hover:bg-gray-800 w-full max-w-[90px] md:max-w-[120px] py-2 px-4 text-sm md:text-xl rounded-md transition-all duration-200 text-gray-100 ">
                            Signup
                        </Link>
                        <Link to='/login' className="bg-slate-300 border text-center hover:border-gray-400 max-w-[90px] md:max-w-[120px] py-2 px-6 text-sm md:text-xl rounded-md transition-all duration-200 text-gray-800 ">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage