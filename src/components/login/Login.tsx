import React, {Fragment, useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import validator from 'validator';


import "./Login.css";
import logo from "../../images/logo.png";
import {useAuth} from "../../provider/AuthProvider";
import {useAxios} from "../../configuration/AxiosConfiguration";

function Login() {
    const navigate = useNavigate();
    const {axiosInstance} = useAxios();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {payload, setAccessToken} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    if (payload && payload.sub && payload.roles.length) {
        console.log(payload);
        console.log(payload.sub);
        console.log(payload.roles.length);

        return <Navigate to="/dashboard"/>;
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (email && validator.isEmail(email)) {

        }
        try {
            setIsLoading(true)
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });
            const {access_token} = response.data;
            // Save tokens to local storage
            setAccessToken(access_token);
            navigate("/");
            setIsLoading(false);
        } catch (error) {
            setIsEmailError(true)
            setIsPasswordError(true);
            setIsLoading(false)
        }
    };

    if (isLoading) {
        return (<div className="wrapper">
            <div className="customPreloader flex-column justify-content-center align-items-center">
                <img className="animationShake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60"
                     width="60"/>
            </div>
        </div>)
    }

    return (
        <Fragment>
            <main className="w-full max-w-md mx-auto p-6">
                <div
                    className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                                Sign in
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account yet?
                                <a
                                    className="text-blue-600 decoration-2 hover:underline font-medium"
                                    href="#"
                                >
                                </a>
                            </p>
                        </div>
                        <div className="mt-4">
                            <div
                                className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                                Or
                            </div>
                            {/* Form */}
                            <div className={"w-full"}>
                                <div className="grid gap-y-4">
                                    {/* Form Group */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm mb-2 dark:text-white"
                                        >
                                            Email address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email as string}
                                                onChange={handleEmail}
                                                className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                aria-describedby="email-error"
                                            />
                                            <div
                                                className={`absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3 ${!isPasswordError && 'hidden'}`}>
                                                <svg
                                                    className="h-5 w-5 text-red-500"
                                                    width={16}
                                                    height={16}
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p
                                            className={`text-xs text-red-600 mt-2 ${!isEmailError && 'hidden'}`}
                                            id="email-error">
                                            Please provide a valid email address
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm mb-2 dark:text-white"
                                            >
                                                Password
                                            </label>
                                            <a
                                                className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                                                href="#"
                                            >
                                            </a>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={handlePassword}
                                                className="customInput py-2 px-3 block w-full border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                                aria-describedby="password-error"/>
                                            <div
                                                className={`absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3 ${!isPasswordError && 'hidden'}`}>
                                                <svg
                                                    className="h-5 w-5 text-red-500"
                                                    width={16}
                                                    height={16}
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className={`text-xs text-red-600 mt-2 ${!isPasswordError && 'hidden'}`}
                                            id="password-error">
                                            The provided Email and Password is wrong
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <input
                                                disabled={true}
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <label
                                                htmlFor="remember-me"
                                                className="text-sm dark:text-white">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    {/* End Checkbox */}
                                    <button
                                        onClick={handleLogin}
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
}

export default Login;
