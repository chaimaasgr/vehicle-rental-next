import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/types";
import { formatPrice } from "@/lib/pricing";
import { CategoryBadge } from "./CategoryBadge";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { IconSeat, IconGear } from "./icons";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/vehicules/${vehicle.id}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-asphalt-100">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          sizes="(min-width: 1024px) 320px, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <CategoryBadge category={vehicle.category} />
        </div>
        <div className="absolute right-3 top-3">
          <AvailabilityBadge available={vehicle.available} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
            {vehicle.brand}
          </p>
          <h3 className="font-display text-lg font-semibold text-asphalt-900">
            {vehicle.model}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-asphalt-600">
          <span className="flex items-center gap-1.5">
            <IconSeat className="h-4 w-4" /> {vehicle.seats} places
          </span>
          <span className="flex items-center gap-1.5">
            <IconGear className="h-4 w-4" />{" "}
            {vehicle.transmission === "automatique" ? "Automatique" : "Manuelle"}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="font-display text-xl font-bold text-asphalt-900">
              {formatPrice(vehicle.pricePerDay)}
            </span>
            <span className="text-sm text-asphalt-500"> / jour</span>
          </div>
          <span className="text-sm font-semibold text-signal-600 group-hover:underline">
            Voir le détail →
          </span>
        </div>
      </div>
    </Link>
  );
}
