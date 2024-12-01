import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";

function SidebarAccordion({ icon, title, links }) {
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
          {links.map((link) => (
            <AccordionContent key={link.label}>
              <NavLink to={link.href} className="text-gray-200 cursor-pointer">
                {link.label}
              </NavLink>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default SidebarAccordion;
