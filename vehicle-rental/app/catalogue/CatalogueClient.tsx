"use client";

import { useEffect, useState } from "react";
import type { Vehicle, VehicleFilters } from "@/types";
import { fetchVehicles } from "@/lib/client-api";
import { FilterBar } from "@/components/FilterBar";
import { VehicleCard } from "@/components/VehicleCard";

export function CatalogueClient({
  initialVehicles,
}: {
  initialVehicles: Vehicle[];
}) {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchVehicles(filters)
      .then((data) => {
        if (!cancelled) setVehicles(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        resultCount={vehicles.length}
      />

      <div>
        {loading && (
          <p className="mb-4 text-sm text-asphalt-500">Actualisation…</p>
        )}

        {vehicles.length === 0 ? (
          <div className="rounded-xl2 border border-dashed border-asphalt-700/20 bg-white p-12 text-center">
            <p className="font-display text-lg font-semibold text-asphalt-900">
              Aucun véhicule ne correspond à ces critères
            </p>
            <p className="mt-2 text-sm text-asphalt-600">
              Essayez d&apos;élargir vos filtres, par exemple en augmentant le
              prix maximum ou en changeant de catégorie.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
