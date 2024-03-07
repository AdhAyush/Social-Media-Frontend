import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="w-full bg-slate-800">
      <div className="">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
