/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Protected({ children }) {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        if (!localStorage.getItem('cookieFallback')) {
            navigate('/login')
        }
        return setLoading(false)
    }, [navigate])

    return loading ? <h1>Loading</h1> : children

}

export default Protected