import React from 'react'

const ThemeSelector = (props) => {
    return (
        <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label={props.ThemeTitle} value={props.ThemeTitle} /></li>
    )
}

export default ThemeSelector