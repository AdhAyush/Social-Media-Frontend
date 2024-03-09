import React, { useState } from "react";
import useProfile from "../hooks/ProfileHook";

const LeftSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFriends, setShowFriends] = useState(false);
  const { searchFunction, searchResults } = useProfile();
  const { friends } = useProfile();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearch = async () => {
    console.log("Searching for:", searchQuery);
    await searchFunction(searchQuery);
  };

  const toggleFriends = () => {
    setShowFriends(!showFriends);
  };

  return (
    <div className=" left-4 top-40 p-4 w-full">
      <button
        className="fixed top-4 left-4 text-white px-4 py-2 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      <div
        className={`bg-gray-200 w-96 h-screen fixed left-0 top-0 overflow-y-auto transition-all duration-300 rounded-md ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-auto md:h-auto md:overflow-visible`}
      >
        <div className="p-4 h-full overflow-y-auto"> {/* Wrap content in a div with fixed height and overflow-y-auto */}
          <div className="text-center mb-8">
            <img
              src="src\static\logo.jpg"
              alt="Logo"
              className="w-24 h-24 mx-auto"
            />
            <p className="text-gray-800 font-semibold text-lg mt-2">
              Cheerify
            </p>
          </div>

          <nav className="space-y-4 mt-4 mb-4">
            <a
              href="/"
              className="block py-1 px-2 w-24 bg-white text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"

            >
              Log Out
            </a>
          </nav>

          <div className="flex mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ml-2"
            >
              Search
            </button>
          </div>
          <div className="mt-4">
            {searchResults.map((result) => (
              <div key={result.id} className="white p-2 rounded-md mb-2">
                {result.name}
              </div>
            ))}
          </div>

          <div className="mb-4">
          </div>

          {friends &&
            friends.map((friend) => (
              <div
                key={friend.id}
                className="w-full flex flex-col text-center bg-white p-2 rounded-md mb-1"
              >
                <div className="flex justify-between p-2 border-b-2">
                  {/* <div>Profile Picture</div> Replace with actual profile picture */}
                  <div>{friend.name}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
