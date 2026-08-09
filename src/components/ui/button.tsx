import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:outline-accent-500",
  secondary:
    "bg-white text-brand-900 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 focus-visible:outline-brand-500",
  ghost:
    "bg-transparent text-brand-800 ring-1 ring-inset ring-brand-300 hover:bg-brand-100 focus-visible:outline-brand-500",
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
