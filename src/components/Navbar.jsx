import { NavLink } from "react-router-dom";
import useProfile from "../hooks/ProfileHook";

function Navbar() {
  const { getPosts , getTimelinePosts} = useProfile();


  const handleHomeClick = () => {
    getPosts(); // Refresh posts when Home link is clicked
  };
  const handleProfileClick = () => {
    getTimelinePosts(); // Refresh posts when Home link is clicked
  };


  return (
    <nav className="fixed top-0 left-0 right-0 z-10 w-2/3  m-2 mx-auto text-md font-bold text-purple-500">
      <ul className="bg-slate-300 p-4 rounded-md w-full mx-auto flex justify-around">
        <li>
          <NavLink
             to="/home"
            className={({ isActive }) => `${isActive ? "text-orange-400" : ""}`} 
            onClick={handleHomeClick}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className={({ isActive }) => `${isActive ? "text-orange-400" : ""}`}
          >
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/videos"
            className={({ isActive }) => `${isActive ? "text-orange-400" : ""}`}
          >
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => `${isActive ? "text-orange-400" : ""}`}
            onClick={handleProfileClick}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
