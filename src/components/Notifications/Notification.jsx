import React from 'react'

const Notification = ({notif}) => {
    
    return (
        <div className="collapse bg-base-200 flex" width = "">
        <input type="radio" name="my-accordion-1" checked="checked" /> 
        <div className="collapse-title text-xl font-small">
        {notif}
        </div>
        <div className="collapse-content"> 
        </div>
      </div>
  )
}

export default Notification
