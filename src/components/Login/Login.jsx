import React from 'react'
const Login = () => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        console.log(username)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        console.log(password)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        console.log('login button clicked')
        console.log(process.env.REACT_APP_EXPRESS_URL)
        let input = { username, password }

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
            localStorage.setItem('token', data.token)

        } catch (error) {
            console.log(error)
        }
    }

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
        </>
    )
}

export default Login
