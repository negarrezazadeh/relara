import { Outlet } from "react-router-dom";
import Content from "./Content";
import Header from "./Header";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <main>
      <Header />
      <SideBar />
      <div className="h-screen bg-dark pt-[77px] lg:ps-60">
        <Content>
          <Outlet />
        </Content>
      </div>
    </main>
  );
}

export default AppLayout;
