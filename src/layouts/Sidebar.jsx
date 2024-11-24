import { FaUser } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import SidebarAccordion from "@/ui/SidebarAccordion";
import SidebarLink from "@/ui/SidebarLink";
import { Input } from "@/components/ui/input";

function SideBar({ isSidebarOpen }) {
  const userLinks = [
    { label: "Super Admin", href: "/super-admin" },
    { label: "Admin", href: "/admin" },
    { label: "User", href: "/user" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 top-[71px] z-50 w-60 border-r border-gray-600 bg-dark-800 lg:top-[77px] lg:block ${isSidebarOpen ? "block" : "hidden"}`}
    >
      <div className="block w-60 py-4 px-5 m-auto lg:hidden">
        <Input type="text" placeholder="Search" />
      </div>
      <SidebarLink icon={<BiSolidCategory />} title="Dashboard" />
      <SidebarAccordion icon={<FaUser />} title="User Role" links={userLinks} />
      <SidebarAccordion icon={<FaUser />} title="User Role" links={userLinks} />
    </div>
  );
}

export default SideBar;
