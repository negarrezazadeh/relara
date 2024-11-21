import { Outlet } from "react-router-dom";
import Content from "./Content";
import Header from "./Header";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <main>
      <Header />
      <div className="grid grid-cols-12">
        <div className="lg:col-span-3">
          <SideBar />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <Content>
            <Outlet />
          </Content>
        </div>
      </div>
    </main>
  );
}

export default AppLayout;
