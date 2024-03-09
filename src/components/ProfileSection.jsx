import React from "react";
import PropTypes from "prop-types";
import PostList from "../components/PostList";
import useProfile from "../hooks/ProfileHook";

function ProfileSection({  }) {

    const { name, email, UID, profilepic } = useProfile();

  console.log("ProfileSection -> name", name, profilepic)
  return (
<div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto mb-8 mt-4">
  <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
    {/* Profile Picture */}
    <img
      src= {profilepic}
      alt="Profile Picture"
      className="w-24 h-24 rounded-full mr-4"
    />
    <div>
      {/* Profile Name */}
      <h2 className="text-xl font-semibold mb-2">{name} {email} {UID}</h2>
      {/* Profile Description */}
      <p className="text-gray-600 mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      {/* Timeline Posts */}
      <h3 className="text-lg font-semibold">Timeline Posts</h3>
    </div>
  </div>
</div>

  );
}


export default ProfileSection;
