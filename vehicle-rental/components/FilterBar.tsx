"use client";

import type { Category, Transmission, VehicleFilters } from "@/types";

const CATEGORIES: { value: Category | "toutes"; label: string }[] = [
  { value: "toutes", label: "Toutes" },
  { value: "economique", label: "Économique" },
  { value: "suv", label: "SUV" },
  { value: "utilitaire", label: "Utilitaire" },
  { value: "premium", label: "Premium" },
];

const TRANSMISSIONS: { value: Transmission | "toutes"; label: string }[] = [
  { value: "toutes", label: "Toutes" },
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
];

interface FilterBarProps {
  filters: VehicleFilters;
  onChange: (filters: VehicleFilters) => void;
  resultCount: number;
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  return (
    <aside className="h-fit rounded-xl2 border border-asphalt-700/10 bg-white p-6 shadow-card lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-asphalt-900">
          Filtres
        </h2>
        <button
          type="button"
          onClick={() => onChange({})}
          className="focus-ring rounded text-xs font-semibold text-signal-600 hover:underline"
        >
          Réinitialiser
        </button>
      </div>

      <p className="mt-1 text-xs text-asphalt-500">
        {resultCount} véhicule{resultCount > 1 ? "s" : ""} trouvé
        {resultCount > 1 ? "s" : ""}
      </p>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
          Catégorie
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange({ ...filters, category: c.value })}
              className={`focus-ring rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                (filters.category ?? "toutes") === c.value
                  ? "border-asphalt-900 bg-asphalt-900 text-mist-50"
                  : "border-asphalt-700/15 text-asphalt-700 hover:border-asphalt-900"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
          Transmission
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TRANSMISSIONS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onChange({ ...filters, transmission: t.value })}
              className={`focus-ring rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                (filters.transmission ?? "toutes") === t.value
                  ? "border-asphalt-900 bg-asphalt-900 text-mist-50"
                  : "border-asphalt-700/15 text-asphalt-700 hover:border-asphalt-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <label
          htmlFor="seats"
          className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
        >
          Places minimum
        </label>
        <select
          id="seats"
          value={filters.seats ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              seats: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="focus-ring mt-3 w-full rounded-lg border border-asphalt-700/15 px-3 py-2 text-sm"
        >
          <option value="">Indifférent</option>
          <option value="2">2+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
        </select>
      </fieldset>

      <fieldset className="mt-6">
        <label
          htmlFor="maxPrice"
          className="text-xs font-semibold uppercase tracking-wide text-asphalt-500"
        >
Prix maximum / jour : {filters.maxPrice ? `${filters.maxPrice} DH` : "Illimité"}        </label>
        <input
          id="maxPrice"
          type="range"
          min={20}
          max={200}
          step={5}
          value={filters.maxPrice ?? 200}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="focus-ring mt-3 w-full accent-signal-500"
        />
      </fieldset>

      <label className="mt-6 flex items-center gap-2 text-sm text-asphalt-700">
        <input
          type="checkbox"
          checked={filters.availableOnly ?? false}
          onChange={(e) =>
            onChange({ ...filters, availableOnly: e.target.checked })
          }
          className="focus-ring h-4 w-4 rounded accent-signal-500"
        />
        Disponibles uniquement
      </label>
    </aside>
  );
}
