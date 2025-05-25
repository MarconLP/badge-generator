"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import badges from "../../data/tickets.json";
import { Badge } from "@/app/page";

export function BadgeSelector({
    currentBadge,
    setCurrentBadge
}: {
    currentBadge: Badge | null,
    setCurrentBadge: (badge: Badge | null) => void
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentBadge
            ? badges.find((badge) => badge.id === currentBadge.id)?.name
            : "Select badge..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search badge..." />
          <CommandList>
            <CommandEmpty>No badges found.</CommandEmpty>
            <CommandGroup>
              {badges.map((badge) => (
                <CommandItem
                  key={badge.id}
                  value={`${badge.name} - ${badge.id}`}
                  onSelect={(currentValue) => {
                    const id = currentValue.split(" - ")[1];
                    setCurrentBadge(badges.find((badge) => badge.id === id) || null);
                    setOpen(false);
                  }}
                >
                  {badge.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentBadge?.id === badge.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
