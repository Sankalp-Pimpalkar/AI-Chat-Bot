import { Link, useNavigate } from "react-router-dom"
import { Button, InputField } from "../components"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login } from "../redux/reducers/authReducer"
import authService from "../services/appwrite/auth"
import { useState } from "react"
import { Loader } from "../components"

function Signup() {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    function handlesignup(data) {
        setLoading(true)
        authService.createAccount(data)
            .then((userData) => {
                console.log(userData)
                dispatch(login(userData))
                navigate('/')
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
            <h1 className="h1-style px-5">Create your Account</h1>

            <div className="mt-10 w-full max-w-xs mx-auto border-gray-700 py-2">
                <form onSubmit={handleSubmit(handlesignup)} className="flex items-center flex-col gap-3">
                    <InputField
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
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

                <p className="paragraph-style text-left pt-2">Already have an account ?
                    <Link className="link" to='/login'>Login</Link>
                </p>
            </div>

        </div>
    )
}

export default Signup