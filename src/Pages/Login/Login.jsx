import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Login = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()

    const { signInGoogle, signIn } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(() => {
                toast.success("login successfully")
                reset()
            })
            .catch(() => {
                toast.error("Invalid credentials")
            })

    };

    const handleGoogleLogin = () => {
        signInGoogle()
            .then((result) => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        toast.success("login successfully")
                        navigate('/')
                    })
            })
            .catch(() => {
                toast.error("Invalid credentials")
            })
    }

    return (
        <div className="flex bg-black">
            <div className="w-1/2">

            </div>
            <div className="w-1/2">
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl">
                    <h1 className="text-2xl font-bold text-center text-white">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="username" className="block dark:text-gray-600 text-white">Email</label>
                            <input type="email" {...register("email", { required: true })} name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />
                            {errors.email && <span className="text-red-700">Email is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600 text-white">Password</label>
                            <input type="password" {...register("password", { required: true })} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />
                            {errors.password?.type === "required" && <span className="text-red-700">Password is required</span>}
                            <div className="flex justify-end text-xs dark:text-gray-600 text-white">
                                <a>Forgot Password?</a>
                            </div>
                        </div>
                        <button type="submit" className="block w-full p-3 text-center rounded-sm bg-red-700 text-white">Sign in</button>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm dark:text-gray-600 text-white">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={handleGoogleLogin} aria-label="Log in with Google" className="p-3 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current text-white">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600 text-white">Do not have an account?
                        <Link to={"/registration"} className="underline text-red-700">Sing up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;