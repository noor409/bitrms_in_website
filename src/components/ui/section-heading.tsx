import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-wide uppercase",
            light ? "text-accent-300" : "text-accent-600"
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-brand-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-lg", light ? "text-brand-100" : "text-brand-700")}>
          {description}
        </p>
      )}
    </div>
  );
}
