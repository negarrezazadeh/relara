import React from "react";

function SidebarLink({ icon, title }) {
  const sidebarIcon = React.cloneElement(icon, {
    className: `${icon.props.className || ""} text-gray-400`,
  });
  return (
    <>
      <div className="flex cursor-pointer items-center gap-x-2 px-5 py-4">
        {sidebarIcon}
        <span className="text-gray-200">{title}</span>
      </div>
    </>
  );
}

export default SidebarLink;
