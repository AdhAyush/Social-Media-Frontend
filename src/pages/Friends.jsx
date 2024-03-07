import React, { useEffect, useState } from "react";
import useProfile from "../hooks/ProfileHook";

import Navbar from "../components/Navbar";

const Friends = () => {
  // Fetch friend list data using useProfile hook
  const {
    getFriends,
    getFriendReq,
    fRequests,
    acceptRequests,
    friends,
    loading,
  } = useProfile();

  // State variable to keep track of accept status for each friend request
  const [acceptStatus, setAcceptStatus] = useState({});

  useEffect(() => {
    // Call the getFriends function when the component mounts
    getFriends();
    getFriendReq();
  }, []);

  return (
    <div className="fixed bg-slate-800 w-full  top-0">
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto mt-16  p-4 rounded-lg shadow-md h-screen">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Friend Requests
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {fRequests.map((fRequest) => (
                <div key={fRequest.id} className="bg-gray-100 rounded-lg p-4">
                  <div>
                    <div className="p-2">
                      {" "}
                      <p className="text-center text-lg font-bold">
                        {fRequest.name}
                      </p>
                    </div>
                    <div>
                      <div className="border-2 border-gray-800"></div>
                      <button
                        className="p-2 m-1 bg-blue-500 rounded-md"
                        onClick={() => {
                          acceptRequests(fRequest.id);
                          // Update accept status to true for this friend request
                          setAcceptStatus((prevStatus) => ({
                            ...prevStatus,
                            [fRequest]: true,
                          }));
                        }}
                        // Disable the button if accept status is true
                        disabled={acceptStatus[fRequest]}
                      >
                        {acceptStatus[fRequest] ? "Accepted" : "Accept"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Friend List
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {friends.map((friend) => (
                <div key={friend.id} className="bg-gray-100 rounded-lg p-4">
                  <p className="text-center text-sm">{friend.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
