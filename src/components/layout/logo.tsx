import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold",
          light ? "bg-white text-accent-600" : "bg-accent-500 text-white"
        )}
      >
        BR
      </span>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          light ? "text-white" : "text-brand-950"
        )}
      >
        BITRMS
      </span>
    </Link>
  );
}
