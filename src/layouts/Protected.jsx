/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Protected({ children }) {

    const [loading, setLoading] = useState(true)
    const authState = useSelector(state => state.authReducer.authenticated)
    console.log(authState)
    const navigate = useNavigate()

    useEffect(() => {

        if (!authState) {
            navigate('/login')
        }
        return setLoading(false)
    }, [navigate, authState])

    return loading ? <h1>Loading</h1> : children

}

export default Protected