import { Outlet } from "react-router-dom";

import Content from "./Content";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <SideBar isSidebarOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/90 opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div className="h-screen bg-dark pt-[77px] lg:ps-60">
        <Content>
          <Outlet />
        </Content>
      </div>
    </main>
  );
}

export default AppLayout;
