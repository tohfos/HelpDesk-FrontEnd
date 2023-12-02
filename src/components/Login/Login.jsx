import React, { Component } from 'react';
import { useState } from 'react';
export default class Login extends Component {

    //create state variables for each input
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        //bind handleChange function so we can use it to update state for each input
        this.handleChange = this.handleChange.bind(this);
    }

    //update state based on form input changes
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {

        //Log in user API call
        const handleLogin = async () => {

            console.log(this.state.username);
            console.log(this.state.password);

            // if (this.state.username === "" || this.state.password === "") {
            //     return (<>
            //         <div className="alert alert-error">
            //             <div className="flex-1">
            //                 <label className="mx-4">Please enter a username and password.</label>
            //             </div>
            //         </div>
            //     </>)
            // }

            await fetch(`${process.env.BACKEND_URL}/auth/`, {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        username: this.state.username,
                        password: this.state.password
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
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
                                    />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">
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
        );
    }
}
