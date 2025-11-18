import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
