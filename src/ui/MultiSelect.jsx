"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function MultiSelect({ list, label, defaultItems, onChange }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState(defaultItems || []);
  
    const handleSelect = (item) => {
      let updatedValues;
      if (selectedValues.includes(item)) {
        // if selected, remove
        updatedValues = selectedValues.filter((value) => value !== item);
      } else {
        // if not selected, add
        updatedValues = [...selectedValues, item];
      }
  
      setSelectedValues(updatedValues);
      if (onChange) {
        onChange(updatedValues);
      }
    };
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between border-gray-600 bg-transparent"
          >
            {selectedValues.length > 0
              ? selectedValues
                  .map((value) => list.find((item) => item.id === value)?.name)
                  .join(", ")
              : `Select ${label}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandList>
              <CommandEmpty>No {label} found.</CommandEmpty>
              <CommandGroup>
                {list.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(item.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }