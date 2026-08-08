import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold",
          light ? "bg-accent-400 text-brand-950" : "bg-brand-900 text-white"
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
