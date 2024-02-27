import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="w-full">
      <Navbar />
      <div className=" mt-16">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
