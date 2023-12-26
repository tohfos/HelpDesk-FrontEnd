import React from "react";

const Notification = ({ notif }) => {
  return (
    <div className="mb-3 bg-primary-content p-3 relative z-50 overflow-y">
      <div className="text-xl font-small font-semibold">{notif}</div>
      <div className="collapse-content"></div>
    </div>
  );
};

export default Notification;
