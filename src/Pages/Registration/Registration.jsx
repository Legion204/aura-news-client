import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Lottie from "lottie-react";
import loginAnimation from '../../assets/loginAnimation.json'


const Registration = () => {

    const { createUser, auth } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        createUser(data.email, data.password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: data.name })
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    toast.success("Registration compleat")
                                    navigate("/")
                                }
                            })
                    })

            })
            .catch(() => {
                toast.error("Email is already in use")
            })

    }

    return (
        <div className="lg:flex bg-black">
            <div className="lg:w-1/2 grid">
                <Lottie className="w-[70%] self-center justify-self-center" animationData={loginAnimation} loop={true} />
            </div>
            <div className="lg:w-1/2 grid">
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl self-center justify-self-center">
                    <h1 className="text-2xl font-bold text-center text-white">Registration</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="username" className="block dark:text-gray-600 text-white">Username</label>
                            <input type="text" {...register("name", { required: true })} name="name" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />
                            {errors.name && <span className="text-red-700">Name is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="username" className="block dark:text-gray-600 text-white">Email</label>
                            <input type="email" {...register("email", { required: true })} name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />
                            {errors.email && <span className="text-red-700">Email is required</span>}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600 text-white">Password</label>
                            <input type="password" {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{3,}$/ })} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-green-600" />
                            {errors.password?.type === "minLength" && <span className="text-red-700">Password must be 8 characters long</span>}
                            {errors.password?.type === "required" && <span className="text-red-700">Password is required</span>}
                            {errors.password?.type === "pattern" && <span className="text-red-700">Password must have one spacial, uppercase and number characters</span>}
                            <div className="flex justify-end text-xs dark:text-gray-600 text-white">
                                <a>Forgot Password?</a>
                            </div>
                        </div>
                        <button type="submit" className="block w-full p-3 text-center rounded-sm bg-red-700 text-white">Sign in</button>
                    </form>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-600 text-white">Have an account?
                        <Link to={"/login"} className="underline text-red-700">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;