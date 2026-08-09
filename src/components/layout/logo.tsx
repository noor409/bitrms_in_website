import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo.jpg"
        alt="BITRMS"
        width={201}
        height={86}
        priority
        className="h-9 w-auto rounded-sm"
      />
    </Link>
  );
}
