import { FaUser } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdAccountTree } from "react-icons/md";

import { Input } from "@/components/ui/input";
import SidebarAccordion from "@/ui/SidebarAccordion";
import SidebarLink from "@/ui/SidebarLink";

function SideBar({ isSidebarOpen }) {
  const userLinks = [
    { label: "Users List", href: "/users" },
    { label: "Add User", href: "/users/create" },
  ];

  const categoryLinks = [
    { label: "Categories List", href: "/categories" },
    { label: "Add Category", href: "/categories/create" },
  ];

  const attributeLinks = [
    { label: "Attributes List", href: "/attributes" },
    { label: "Add Attribute", href: "/attributes/create" },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 top-[71px] z-50 w-60 border-r border-gray-600 bg-dark-800 lg:top-[77px] lg:block ${isSidebarOpen ? "block" : "hidden"}`}
    >
      <div className="m-auto block w-60 px-5 py-4 lg:hidden">
        <Input type="text" placeholder="Search" />
      </div>
      <SidebarLink
        icon={<TbLayoutDashboardFilled />}
        title="Dashboard"
        link={"/dashboard"}
      />
      <SidebarAccordion
        icon={<FaUser className="text-sm" />}
        title="User Management"
        links={userLinks}
      />
      <SidebarAccordion
        icon={<BiSolidCategoryAlt className="text-md" />}
        title="Category"
        links={categoryLinks}
      />
      <SidebarAccordion
        icon={<MdAccountTree />}
        title="Attribute"
        links={attributeLinks}
      />
    </div>
  );
}

export default SideBar;
