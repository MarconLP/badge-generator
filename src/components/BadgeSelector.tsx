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

export interface Badge {
    name: string
    firstname: string
    lastname: string
    barcode: string
    eventId: string
    "event.name": string
    "event.start": string
    customerId: string
    transactionId: string
    ticketTypeId: string
    underShopId: string
    id: string
    secret: string
    email: string
    ticketName: string
    category: string
    price: string
    status: string
    deliveryType: string
    cartItemId: string
    triggeredBy: string
    origin: string
    createdAt: string
    "extraFields.afterparty": string
    "extraFields.afterwork": string
    "extraFields.an_welcher_uni_studierst_du": string
    "extraFields.linkedin": string
    "extraFields.spezifizierung_normales_ticket": string
    "extraFields.studentenausweis": string
    "extraFields.studiengang": string
    "extraFields.umfrage": string
    "extraFields.umfrage_1": string
  }
  

export function BadgeSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Badge | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? badges.find((badge) => badge.id === value?.id)?.name
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
                    setValue(badges.find((badge) => badge.id === id) || null);
                    setOpen(false);
                  }}
                >
                  {badge.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.id === badge.id ? "opacity-100" : "opacity-0",
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
