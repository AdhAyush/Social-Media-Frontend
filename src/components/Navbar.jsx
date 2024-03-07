import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 w-2/3  m-2 mx-auto text-md font-bold text-purple-500">
      <ul className="bg-slate-300 p-4 rounded-md w-full mx-auto flex justify-around">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => `${isActive ? "text-orange-400" : ""}`}
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
            to="/profile/:id"
            className={({ isActive }) => `${isActive ? "text-orange-400" : ""}`}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
