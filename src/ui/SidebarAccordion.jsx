import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SidebarAccordion({ icon, title, links }) {
  const sidebarIcon = React.cloneElement(icon, {
    className: `${icon.props.className || ""} text-gray-400 text-sm`,
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
              <a href={link.href} className="text-gray-200">
                {link.label}
              </a>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default SidebarAccordion;
