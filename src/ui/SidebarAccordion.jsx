import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink, useLocation } from "react-router-dom";

function SidebarAccordion({ icon, title, links }) {
  const location = useLocation();
  
  const sidebarIcon = React.cloneElement(icon, {
    className: `${icon.props.className || ""} text-gray-400`,
  });
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-x-2">
              {sidebarIcon}
              <span>{title}</span>
            </div>
          </AccordionTrigger>
          {links.map((link) => {
            const isActive = location.pathname === link.href; // check if link is active
            return (
              <AccordionContent key={link.label}>
                <NavLink
                  to={link.href}
                  className={`cursor-pointer ${
                    isActive
                      ? "font-semibold text-violet-500" // style for active link
                      : "text-gray-200" // default style
                  }`}
                >
                  {link.label}
                </NavLink>
              </AccordionContent>
            );
          })}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default SidebarAccordion;
