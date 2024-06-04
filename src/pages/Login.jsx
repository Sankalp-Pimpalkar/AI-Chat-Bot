import { Link, useNavigate } from "react-router-dom"
import { Button, InputField } from "../components"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../redux/reducers/authReducer"
import authService from "../services/appwrite/auth"
import { useState } from "react"
import { Loader } from "../components"

function Login() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function handlesignin(data) {
        setLoading(true)
        authService.login(data)
            .then((userData) => {
                dispatch(login(userData))
                navigate('/', {replace: true})
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="w-full">
            <h1 className="h1-style px-5 text-gray-300">Login to Get Started</h1>

            <div className="mt-10 w-full max-w-xs mx-auto py-2">
                <form onSubmit={handleSubmit(handlesignin)} className="flex items-center flex-col gap-3">
                    <InputField
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <InputField
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <Button
                        disabled={loading}
                        className="flex items-center justify-center gap-2"
                        type="submit">
                        {
                            loading && <Loader />
                        }
                        Submit
                    </Button>
                </form>

                <p className="paragraph-style text-left pt-2">
                    New User ?
                    <Link className="link" to='/signup'>Signup</Link>
                </p>
            </div>

        </div>
    )
}

export default Login