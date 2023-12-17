import React from 'react';
import Themes from '../../constants/Themes';

const ThemeSelector = ({ selectedTheme, handleThemeSelect, isMainTheme }) => {

    return (

        <div className="flex flex-col space-y-8">
            <p>
                {/* show saved themes from localstorage */}
                current {isMainTheme ? "main " : "secondary "} theme: <span className="font-semibold">{selectedTheme}</span>
            </p>
            <div className="flex flex-row space-x-2">
                <h1 className="self-start text-lg mr-3 my-3">{isMainTheme ? "Main " : "Secondary "} Theme Select: </h1>
                <div className="dropdown mb-32">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {selectedTheme}
                        <svg
                            width="12px"
                            height="12px"
                            className="h-2 w-2 fill-current opacity-60 inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 2048 2048"
                        >
                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="self-center dropdown-content z-[1] p-2 shadow-xl bg-base-300 rounded-box w-52 h-32 overflow-auto"
                    >
                        {Themes.map((theme, index) => (
                            <input
                                key={index}
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                aria-label={theme}
                                value={theme}
                                onChange={() => handleThemeSelect(theme)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
