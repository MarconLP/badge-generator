import { BadgeSelector } from "@/components/BadgeSelector";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <p className="tracking-[-.01em]">
              Print a badge
          </p>

          <div className="mt-4">
            <BadgeSelector />
          </div>
        </div>
      </main>
    </div>
  );
}
