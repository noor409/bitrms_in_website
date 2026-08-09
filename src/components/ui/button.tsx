import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-brand-950 hover:bg-accent-400 focus-visible:outline-accent-500",
  secondary:
    "bg-brand-800 text-white hover:bg-brand-700 focus-visible:outline-white",
  ghost:
    "bg-transparent text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 focus-visible:outline-white",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </Link>
  );
}
