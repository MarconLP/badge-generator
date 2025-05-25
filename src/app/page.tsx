"use client"

import { BadgePreview } from "@/components/BadgePreview";
import { BadgeSelector } from "@/components/BadgeSelector";
import { useState } from "react";

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
  "extraFields.affiliation": string
  "extraFields.role": string
}

export default function Home() {
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null);

  return (
    <div className="flex justify-around items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <p className="tracking-[-.01em]">Print a badge</p>

          <div className="mt-4">
            <BadgeSelector setCurrentBadge={setCurrentBadge} currentBadge={currentBadge} />
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="dark:invert">Print badge</button>
          </a>
        </div>
      </div>
      <div>
        <div className="drop-shadow-xs">
          <BadgePreview currentBadge={currentBadge} />
        </div>
      </div>
    </div>
  );
}
