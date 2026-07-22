import type { Category } from "@/types";

const LABELS: Record<Category, string> = {
  economique: "Économique",
  suv: "SUV",
  utilitaire: "Utilitaire",
  premium: "Premium",
};

const STYLES: Record<Category, string> = {
  economique: "bg-route-500/10 text-route-600",
  suv: "bg-signal-500/15 text-signal-600",
  utilitaire: "bg-asphalt-700/10 text-asphalt-700",
  premium: "bg-asphalt-900 text-mist-50",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STYLES[category]}`}
    >
      {LABELS[category]}
    </span>
  );
}

export function categoryLabel(category: Category) {
  return LABELS[category];
}
