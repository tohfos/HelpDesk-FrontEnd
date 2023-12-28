import React from 'react'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

const Index = () => {

    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value)
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            fail("Passwords do not match")
            return
        }

        let user = jwtDecode(Cookies.get('token'));

        console.log(user)

        const input = {
            userId: user.UserInfo.userid,
            oldpass: oldPassword,
            newpass: newPassword
        }

        console.log(input)

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/user/resetPassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('token')
                },
                body: JSON.stringify(input),
                credentials: 'include'
            })
            const data = await response.json()
            console.log(data)

            if (response.ok) {
                // redirect to the dashboard page
                success(data.message)
                window.location.href = '/dashboard/knowledgebase'
            } else {
                console.log(data.message + " dasdadd")
                fail(data.message)
            }
        } catch (error) {
            fail(error)
            console.log(error)
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
        <div>
            <div className="hero min-h-screen w-full bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form className="card-body w-auto">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Old Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your old password"
                                    className="input input-bordered"
                                    required
                                    onChange={handleOldPasswordChange}
                                    value={oldPassword}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your new password"
                                    className="input input-bordered"
                                    required
                                    onChange={handleNewPasswordChange}
                                    value={newPassword}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm your new password"
                                    className="input input-bordered"
                                    required
                                    onChange={handleConfirmPasswordChange}
                                    value={confirmPassword}
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button onClick={handleResetPassword} className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>

    )
}

export default Index