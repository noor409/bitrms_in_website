import { Icon } from "@/components/ui/icon";
import type { IconKey } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * Renders a service's icon with a small looping decorative animation
 * themed to that practice — e.g. rising bubbles for electrolysis (Green
 * Hydrogen), a radar pulse for Cyber Security. Purely illustrative/abstract,
 * not a depiction of real product footage.
 */
export function ServiceIcon({
  icon,
  className,
  iconClassName,
}: {
  icon: IconKey;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden", className)}>
      {icon === "shield" && (
        <span className="service-icon-anim absolute h-[85%] w-[85%] rounded-full bg-current opacity-20 [animation:ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      )}

      {icon === "radio-tower" && (
        <>
          <span className="service-icon-anim absolute h-[70%] w-[70%] rounded-full border border-current opacity-40 [animation:ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <span className="service-icon-anim absolute h-[70%] w-[70%] rounded-full border border-current opacity-30 [animation-delay:0.65s] [animation:ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </>
      )}

      {icon === "leaf" && (
        <>
          <span className="service-icon-anim absolute bottom-[15%] left-[28%] h-1 w-1 rounded-full bg-current [animation:rise-bubble_2.4s_ease-in-out_infinite]" />
          <span className="service-icon-anim absolute bottom-[15%] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current [animation:rise-bubble_2.4s_ease-in-out_infinite] [animation-delay:0.8s]" />
          <span className="service-icon-anim absolute right-[28%] bottom-[15%] h-1 w-1 rounded-full bg-current [animation:rise-bubble_2.4s_ease-in-out_infinite] [animation-delay:1.6s]" />
        </>
      )}

      {icon === "cpu" && (
        <span className="service-icon-anim absolute left-[12%] h-px w-[76%] bg-current [animation:scan-line_2.2s_ease-in-out_infinite]" />
      )}

      {icon === "globe" && (
        <span className="service-icon-anim absolute top-1/2 left-1/2 h-0 w-0 [animation:orbit_3s_linear_infinite]">
          <span className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
        </span>
      )}

      <Icon name={icon} className={cn("relative z-10", iconClassName)} />
    </div>
  );
}
