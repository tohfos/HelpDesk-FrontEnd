import React, { useState } from 'react';
import ThemeSelector from '../../../components/Preferences/ThemeSelector'; // Updated import path

const Index = () => {
    const [mainTheme, setMainTheme] = useState('');
    const [secondaryTheme, setSecondaryTheme] = useState('');

    const handleMainThemeSelect = (theme) => {
        setMainTheme(theme);
    };

    const handleSecondaryThemeSelect = (theme) => {
        setSecondaryTheme(theme);
    };

    const handleSave = () => {
        console.log('Main Theme:', mainTheme);
        console.log('Secondary Theme:', secondaryTheme);

    };

    return (
        <>
            <div className="h-full w-full border-r border-base-200 flex flex-col">
                <div className="h-16 border-b border-base-200 px-4 flex items-center justify-center space-x-4">
                    Preferences
                </div>
                <div className="h-screen overflow-auto">

                    <section className="flex flex-col justify-center items-center mt-5">
                        <h1 className="self-start font-semibold text-xl ml-4">Theme Select: </h1>

                        {/* Main Theme Select */}
                        <ThemeSelector
                            selectedTheme={mainTheme}
                            handleThemeSelect={handleMainThemeSelect}
                            label="Main Theme Select"
                        />

                        {/* Secondary Theme Select */}
                        <ThemeSelector
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

                </div>

            </div>
        </>
    );
};

export default Index;
