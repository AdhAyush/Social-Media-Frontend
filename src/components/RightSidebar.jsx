import React, { useState } from "react";
import useProfile from "../hooks/ProfileHook";

function RightSidebar() {
  const { suggestions, sendRequests } = useProfile();
  const [requestStatus, setRequestStatus] = useState({});

  let content = [];

  if (suggestions) {
    content = suggestions.map((prof) => {
      const ID = prof.value;
      // console.log(prof);
      return (
        <div
          key={ID}
          className="w-full  flex flex-col text-center bg-white p-2 rounded-md mb-1"
        >
          <div className="flex justify-between p-2 border-b-2">
            <div>image </div>
            <div>{prof.value}</div>
          </div>
          <button
            className="bg-blue-500 text-white rounded-md  mx-auto mt-1 p-1"
            disabled={requestStatus[ID]}
            onClick={() => {
              sendRequests(prof.value);
              setRequestStatus((prevStatus) => ({
                ...prevStatus,
                [ID]: true,
              }));
            }}
          >
            {!requestStatus[ID] && "Send Request"}
            {requestStatus[ID] && "Request Sent"}
          </button>
        </div>
      );
    });
  }

  return (
    <div className="fixed right-4 top-16 m-2 p-2 rounded-md  w-1/6">
      {content}
    </div>
  );
}

export default RightSidebar;
