import { t } from 'i18next'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from './api/api_instance';


const Login = () => {
    const navigate = useNavigate();




    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    console.log(formData)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post("/login", formData);
            // Redirect to the home page ("/")
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log(error)
            //  throw(error)

        }



    };
    return (
        <>
            <div className="flex justify-center  flex-wrap text-slate-800">
                <div className="flex w-full flex-col md:w-1/2">
                    <div className="flex justify-center pt-12 md:justify-start md:pl-12">
                        <a href="#" className="text-2xl font-bold text-blue-600"> SimplyShop . </a>
                    </div>
                    <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                        <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your free account</p>
                        <p className="mt-6 text-center font-medium md:text-left">
                            "Welcome back! Let's continue your journey."

                        </p>

                        <p className='font-medium '>Don't have an account? Sign up now to get started!
                            <Link
                                to={"/signup"}
                                className="text-blue-600 ml-2"
                            >
                                {t("signup")}
                            </Link>
                        </p>

                        <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
                            <img className="mr-2 h-5" src="public\images\Googlelogo.svg" alt /> Continue with Google</button>
                        <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
                        </div>
                        <form className="flex flex-col items-stretch pt-3 md:pt-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col pt-4">
                                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                    <input type="email" id="email" name="email" onChange={handleChange} className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col pt-4">
                                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                    <input type="password" id="password" name="password" onChange={handleChange} autocomplete="current-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password (minimum 8 characters)" />
                                </div>
                            </div>
                            <div className="block">
                                <input className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-blue-600 focus:border-blue-600 focus:shadow" onChange={handleChange} type="checkbox" id="remember-me" style={{ backgroundImage: "url('data:image/svg+xml,%3csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\"%3e%3cpath fill=\"none\" stroke=\"%23fff\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 10l3 3l6-6\"/%3e%3c/svg%3e')" }} checked />
                                <label className="inline-block" htmlFor="remember-me"> I agree to the <a className="underline" href="#">Terms and Conditions</a></label>
                            </div>
                            <button type="submit" className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
