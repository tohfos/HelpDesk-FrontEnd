import React from 'react'
import Themes from '../../../constants/Themes'
import ThemeSelector from '../../../components/ThemeSelector'


const Index = () => {
    return (
        <>
            <div class="h-full w-full border-r border-base-200 flex flex-col">
                <div class="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-4">
                    Perefrences
                </div>
                <div class="h-screen overflow-auto">

                    {/* Theme Select */}
                    <div class="flex justify-center items-center space-x-4 mt-5">
                        <div className="flex flex-col space-y-2 p-2">
                            <h1 className='self-start font-semibold text-lg mr-3'>Theme Select: </h1>
                            <ul tabIndex={0} className="self-center dropdown-content z-[1] p-2 shadow-xl bg-base-300 rounded-box w-52 h-64 overflow-auto">
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

                            <button className="my-6 btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Index