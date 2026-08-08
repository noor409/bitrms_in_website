import {
  Award,
  Clock,
  Cpu,
  Globe,
  Leaf,
  RadioTower,
  Shield,
  Target,
  TrendingUp,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/lib/content/types";

const iconMap: Record<IconKey, React.ComponentType<LucideProps>> = {
  leaf: Leaf,
  shield: Shield,
  cpu: Cpu,
  "radio-tower": RadioTower,
  globe: Globe,
  users: Users,
  award: Award,
  target: Target,
  "trending-up": TrendingUp,
  clock: Clock,
};

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Component = iconMap[name] ?? Award;
  return <Component {...props} />;
}
