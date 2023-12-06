import React from 'react'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPVerificationModal from '../../components/OTPVerificationModal';

const Login = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
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
                Cookies.set('token', data.accessToken)
                window.location.href = '/dashboard'
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

    // const confirm = () => {
    //     toast.success(
    //         'Your account has been created succesfully you will be redirected to the login page',
    //         {
    //             position: 'top-center',
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: 'colored',
    //         }
    //     );
    // };

    return (
        <>
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
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />

            <OTPVerificationModal isOpen={false} />
        </>
    )
}

export default Login
