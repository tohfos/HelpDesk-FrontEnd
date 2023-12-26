import React, { useState } from 'react';
import ThemeSelector from '../../../components/Preferences/ThemeSelector'; // Updated import path
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Backup from '../../../components/Preferences/Backup';

const Index = () => {
    const [mainTheme, setMainTheme] = useState('');
    const [secondaryTheme, setSecondaryTheme] = useState('');

    const handleMainThemeSelect = (theme) => {
        setMainTheme(theme);
    };

    const handleSecondaryThemeSelect = (theme) => {
        setSecondaryTheme(theme);
    };


    const handleSave = async () => {

        console.log(mainTheme, secondaryTheme)

        if (mainTheme === '' || secondaryTheme === '') {
            fail('Please select a theme')
            return
        }

        const input = {
            mainTheme: mainTheme,
            secondaryTheme: secondaryTheme
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/admin/changeTheme`, {
                method: 'POST',
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
                success('Theme changed successfully')
            }
            else {
                fail(data.message)
            }
        }
        catch (err) {
            fail('Something went wrong')
            console.log(err)
        }
    }

    useEffect(() => {

        setMainTheme(localStorage.getItem('mainTheme'))
        setSecondaryTheme(localStorage.getItem('secondaryTheme'))
    }, [])



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
    };


    return (
        <>
            <div className="h-full w-full border-r border-base-200 flex flex-col">
                <div className="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-4">
                    <h2 className="font-bold text-xl">Preferences</h2>
                </div>
                <div className="h-screen overflow-auto">

                    <section className="flex flex-col justify-center items-center mt-5">
                        <h1 className="self-start font-semibold text-xl ml-4">Theme Select: </h1>

                        {/* Main Theme Select */}
                        <ThemeSelector
                            isMainTheme={true}
                            selectedTheme={mainTheme}
                            handleThemeSelect={handleMainThemeSelect}
                            label="Main Theme Select"
                        />

                        {/* Secondary Theme Select */}
                        <ThemeSelector
                            isMainTheme={false}
                            selectedTheme={secondaryTheme}
                            handleThemeSelect={handleSecondaryThemeSelect}
                            label="Secondary Theme Select"
                        />

                        {/* Save Button */}
                        <button className="btn btn-primary btn-wide mb-8" onClick={handleSave}>
                            Save
                        </button>

                        <hr className="border-base-200 my-5" />
                    </section>


                    <section className="flex flex-col justify-center items-center my-12">
                        <h1 className="self-start font-semibold text-xl ml-4">Backup & Restore </h1>
                        <Backup />
                        <hr className="border-base-200 my-5" />
                    </section>
                </div>

            </div>
        </>
    );
};

export default Index;
