import React from "react";

const AlertMessage = ({ type, message }) => {
  // Define Tailwind CSS classes based on the type of alert
  let classes = "rounded-md p-4 ";

  switch (type) {
    case "success":
      classes += "bg-green-100 text-green-700";
      break;
    case "error":
      classes += "bg-red-100 text-red-700";
      break;
    case "info":
      classes += "bg-blue-100 text-blue-700";
      break;
    default:
      classes += "bg-gray-100 text-gray-700";
  }

  return (
    <div className={classes}>
      <p>{message}</p>
    </div>
  );
};

export default AlertMessage;
