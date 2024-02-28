import React from "react";
import useProfile from "../hooks/ProfileHook";

function RightSidebar() {
  const { suggestions, follow } = useProfile();
  const content = suggestions.map((prof) => {
    const ID = prof.id;
    return (
      <div key={ID}>
        <div>image name</div>
        <button
          onClick={() => {
            follow(ID);
          }}
        >
          Follow
        </button>
      </div>
    );
  });
  return <div className="fixed right-4 top-16 ">{content}</div>;
}

export default RightSidebar;
