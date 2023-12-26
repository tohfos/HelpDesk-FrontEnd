import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPVerificationModal from '../../components/Login/OTPVerificationModal';
import { jwtDecode } from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";



const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    // TODO enable captcha when deploying
    // const [captchaValue, setCaptchaValue] = React.useState(null);

    // const handleCaptchaResponseChange = (response) => {
    //     setCaptchaValue(response);
    // }



    const handleLogin = async (e) => {
        e.preventDefault()

        // if (captchaValue === null) {
        //     // Show an error message to the user
        //     return;
        // }

        console.log(username, password)
        const input = {
            UserName: username,
            Password: password
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)

            if (response.ok) {
                //get theme from the user settings
                // handleGetTheme()

                // save the token in the cookies that will expire in 15 minutes
                Cookies.set('token', data.accessToken, { expires: 0.01 });

                //check law first time user, y2ba send user to reset passwrord page
                //else law user mesh first time, y2ba send user to otp modal
                if (data.resetPassword === true) {
                    success("Redirecting to reset password page")
                    setTimeout(() => {
                        window.location.href = '/resetpassword'
                    }, 3000);
                }
                else if (data.resetPassword === false) {
                    success("Redirecting to OTP verification page")
                    setIsOpen(true);
                    setUserId(data.user_id);
                    setUserEmail(data.UserInfo.email);
                }
            } else {
                fail(data.message)

            }
        } catch (error) {
            console.log(error)
            fail(error)
        }
    }

    const fail = (alert) => {
        toast.error(alert, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const success = (alert) => {
        toast.success(alert, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    return (
        <>
            <script src="https://www.google.com/recaptcha/api.js"></script>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Please log in to your account. Enter your <span className='font-semibold'>username</span> and <span className='font-semibold'>password</span> into the give fields.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="username"
                                    placeholder="Enter your Username"
                                    className="input input-bordered"
                                    required
                                    onChange={handleUsernameChange}
                                    value={username}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered"
                                    required
                                    onChange={handlePasswordChange}
                                    value={password}
                                />
                                <label className="label">
                                    <a className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleLogin} className="btn btn-primary">Login</button>
                            </div>
                            <div className="form-control">
                                {/* TODO sha8alo when deploying */}
                                {/* <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_SITEKEY} onChange={handleCaptchaResponseChange} /> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />

            <OTPVerificationModal isOpen={isOpen} userId={userId} userEmail={userEmail} userName={username} userPassword={password} />
        </>
    )
}

export default Login
