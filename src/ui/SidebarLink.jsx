import React from "react";
import { NavLink } from "react-router-dom";

function SidebarLink({ icon, title, link }) {
  const sidebarIcon = React.cloneElement(icon, {
    className: `${icon.props.className || ""} text-gray-400`,
  });
  return (
    <NavLink
      to={link}
      className="flex cursor-pointer items-center gap-x-2 p-3 mt-2"
    >
      {sidebarIcon}
      <span className="text-gray-200">{title}</span>
    </NavLink>
  );
}

export default SidebarLink;
