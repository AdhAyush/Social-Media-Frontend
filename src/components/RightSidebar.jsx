
// import React, { useState, useEffect } from "react";
// import useProfile from "../hooks/ProfileHook";

// function RightSidebar() {
//   const { suggestions, sendRequests } = useProfile();
//   const [requestStatus, setRequestStatus] = useState({});

//   useEffect(() => {
//     if (suggestions) {
//       setRequestStatus(
//         suggestions.reduce((acc, curr) => {
//           acc[curr.uid] = false;
//           return acc;
//         }, {})
//       );
//     }
//   }, [suggestions]);


//   const handleSendRequest = async (uid) => {
//     console.log("Sending friend request to:", uid);
//     try {
//       await sendRequests(uid);
//       setRequestStatus((prevStatus) => ({
//         ...prevStatus,
//         [uid]: true,
//       }));
//     } catch (error) {
//       console.error("Failed to send friend request:", error.message);
//     }
//   };

//   return (
//     <div className="fixed right-4 top-16 m-2 p-2 rounded-md w-1/4">
//       {suggestions &&
//         suggestions.map((friend) => (
//           <div
//             key={friend.uid}
//             className="w-full flex flex-col text-center bg-white p-2 rounded-md mb-1"
//           >
//             <div className="flex justify-between p-2 border-b-2">
//               {/* <div>Profile Picture</div> Replace with actual profile picture */}
//               <div>{friend.name}</div>
//             </div>
//             <div className="flex justify-start mt-1"> {/* Align buttons to the left */}
//             {requestStatus[friend.uid] ? (
//                 <span className="text-gray-500 mx-1">Request Sent</span>
//               ) : (
//                 <button
//                   className="bg-blue-500 text-white rounded-md mx-1 p-1"
//                   disabled={requestStatus[friend.uid]}
//                   onClick={() => handleSendRequest(friend.uid)}
//                 >
//                   Send Request
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import useProfile from "../hooks/ProfileHook";

function RightSidebar() {
  const { suggestions, fRequests, sendRequests, acceptRequests } = useProfile();
  const [sendRequestStatus, setSendRequestStatus] = useState({});
  const [confirmRequestStatus, setConfirmRequestStatus] = useState({});

  // Effect to initialize the send request status
  useEffect(() => {
    if (suggestions) {
      setSendRequestStatus(
        suggestions.reduce((acc, curr) => {
          acc[curr.uid] = false;
          return acc;
        }, {})
      );
    }
  }, [suggestions]);

  // Effect to initialize the confirm request status
  useEffect(() => {
    if (fRequests) {
      setConfirmRequestStatus(
        fRequests.reduce((acc, curr) => {
          acc[curr.id] = false;
          return acc;
        }, {})
      );
    }
  }, [fRequests]);

  // Function to handle sending friend requests
  const handleSendRequest = async (uid) => {
    console.log("Sending friend request to:", uid);
    try {
      await sendRequests(uid);
      setSendRequestStatus((prevStatus) => ({
        ...prevStatus,
        [uid]: true,
      }));
    } catch (error) {
      console.error("Failed to send friend request:", error.message);
    }
  };

  // Function to handle accepting friend requests
  const handleAcceptRequest = async (id) => {
    console.log("Accepting friend request of:", id);
    try {
      await acceptRequests(id);
      setConfirmRequestStatus((prevStatus) => ({
        ...prevStatus,
        [id]: true,
      }));
    } catch (error) {
      console.error("Failed to accept friend request:", error.message);
    }
  };

  return (
    <div className="fixed right-4 top-16 m-2 p-2 rounded-md w-1/4">
      {/* Friend Requests */}
      {fRequests &&
        fRequests.map((request) => (
          <div
            key={request.id}
            className="w-full flex flex-col text-center bg-white p-2 rounded-md mb-1"
          >
            <div className="flex justify-between p-2 border-b-2">
              {/* <div>Profile Picture</div> Replace with actual profile picture */}
              <div>{request.name}</div>
            </div>
            <div className="flex justify-start mt-1"> {/* Align buttons to the left */}
              {confirmRequestStatus[request.id] ? (
                <span className="text-gray-500 mx-1">You are Friends</span>
              ) : (
                <>
                  <button
                    className="bg-green-500 text-white rounded-md mx-1 p-1"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Confirm
                  </button>
                  <button className="bg-red-500 text-white rounded-md mx-1 p-1">Reject</button>
                </>
              )}
            </div>
          </div>
        ))}

      {/* Friend Suggestions */}
      {suggestions &&
        suggestions.map((friend) => (
          <div
            key={friend.uid}
            className="w-full flex flex-col text-center bg-white p-2 rounded-md mb-1"
          >
            <div className="flex justify-between p-2 border-b-2">
              {/* <div>Profile Picture</div> Replace with actual profile picture */}
              <div>{friend.name}</div>
            </div>
            <div className="flex justify-start mt-1"> {/* Align buttons to the left */}
              {sendRequestStatus[friend.uid] ? (
                <span className="text-gray-500 mx-1">Request Sent</span>
              ) : (
                <button
                  className="bg-blue-500 text-white rounded-md mx-1 p-1"
                  disabled={sendRequestStatus[friend.uid]}
                  onClick={() => handleSendRequest(friend.uid)}
                >
                  Send Request
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default RightSidebar;
