/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function Protected({ children }) {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const cookieFallback = !localStorage.getItem('cookieFallback') || localStorage.getItem('cookieFallback') === "[]"
        const isLoginPage = location.pathname === '/login' || location.pathname === '/signup'

        if (cookieFallback) {
            if (isLoginPage) {
                return
            } else {
                navigate('/login')
            }
            console.log('hello')
        }
        else if (!cookieFallback) {
            if (isLoginPage) {
                navigate('/')
            } else {
                return
            }
        }

    }, [navigate])

    return children
}

export default Protected