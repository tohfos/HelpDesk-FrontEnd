import React from 'react'
import { useState } from 'react'
import Themes from '../../../constants/Themes'
import ThemeSelector from '../../../components/Preferences/ThemeSelector'


const Index = () => {

    const savedThemes = localStorage.getItem('Themes')

    const [MainTheme, setMainTheme] = useState('Theme')

    const [SecondaryTheme, setSecondaryTheme] = useState('Theme')

    // const handleThemeChange = (e) => {





    return (
        <>
            <div class="h-full w-full border-r border-base-200 flex flex-col">
                <div class="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-4">
                    Perefrences
                </div>
                <div class="h-screen overflow-auto">
                    {/* Theme Select */}
                    <section class="flex flex-col justify-center items-center mt-5">
                        <h1 className='self-start font-semibold text-xl ml-4'>Theme Select: </h1>


                        <div className="flex flex-col space-y-8">


                            <p>
                                {/* show saved themes from localstorage */}
                                current Main theme: <span className="font-semibold"></span>
                            </p>
                            <div className="flex flex-row space-x-2">
                                <h1 className='self-start text-lg mr-3 my-3'>Main Theme Select: </h1>
                                <div className="dropdown mb-32">
                                    <div tabIndex={0} role="button" className="btn m-1">
                                        Theme
                                        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                                    </div>
                                    <ul tabIndex={0} className="self-center dropdown-content z-[1] p-2 shadow-xl bg-base-300 rounded-box w-52 h-32 overflow-auto">
                                        {
                                            // map through the Themes array and return a ThemeSelector component for each theme
                                            Themes.map((theme, index) => {
                                                return (
                                                    <ThemeSelector
                                                        key={index}
                                                        ThemeTitle={theme}
                                                    />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>


                            <p>
                                current Secondary theme: <span className="font-semibold">Theme</span>
                            </p>
                            <div className="flex flex-row space-x-2">
                                <h1 className='self-start text-lg mr-3 my-3'>Secondary Theme Select: </h1>
                                <div className="dropdown mb-32">
                                    <div tabIndex={0} role="button" className="btn m-1">
                                        Theme
                                        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                                    </div>
                                    <ul tabIndex={0} className="self-center dropdown-content z-[1] p-2 shadow-xl bg-base-300 rounded-box w-52 h-32 overflow-auto">
                                        {
                                            // map through the Themes array and return a ThemeSelector component for each theme
                                            Themes.map((theme, index) => {
                                                return (
                                                    <ThemeSelector
                                                        key={index}
                                                        ThemeTitle={theme}
                                                    />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <button className="btn btn-primary btn-wide mb-8">Save</button>
                    </section>
                    <hr className="border-base-200 my-5" />
                </div>
            </div>
        </>
    )
}

export default Index