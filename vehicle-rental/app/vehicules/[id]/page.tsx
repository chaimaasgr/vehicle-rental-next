import Link from "next/link";
import { notFound } from "next/navigation";
import { dataProvider } from "@/lib/data-provider";
import { formatPrice } from "@/lib/pricing";
import { CategoryBadge } from "@/components/CategoryBadge";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { VehicleGallery } from "@/components/VehicleGallery";
import { IconSeat, IconGear, IconCheck, OPTION_ICONS, IconShield } from "@/components/icons";

export async function generateStaticParams() {
  const vehicles = await dataProvider.getVehicles();
  return vehicles.map((v) => ({ id: v.id }));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const vehicle = await dataProvider.getVehicleById(params.id);
  if (!vehicle) notFound();

  const options = await dataProvider.getOptions();

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Link
        href="/catalogue"
        className="focus-ring rounded text-sm font-medium text-asphalt-600 hover:text-asphalt-900"
      >
        ← Retour au catalogue
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <VehicleGallery
          images={vehicle.images}
          alt={`${vehicle.brand} ${vehicle.model}`}
        />

        <div>
          <div className="flex items-center gap-2">
            <CategoryBadge category={vehicle.category} />
            <AvailabilityBadge available={vehicle.available} />
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-asphalt-500">
            {vehicle.brand}
          </p>
          <h1 className="font-display text-3xl font-bold text-asphalt-900">
            {vehicle.model}
          </h1>

          <p className="mt-4 text-asphalt-600">{vehicle.description}</p>

          <div className="mt-6 flex items-center gap-6 text-sm text-asphalt-700">
            <span className="flex items-center gap-1.5">
              <IconSeat className="h-5 w-5 text-asphalt-500" /> {vehicle.seats} places
            </span>
            <span className="flex items-center gap-1.5">
              <IconGear className="h-5 w-5 text-asphalt-500" />{" "}
              {vehicle.transmission === "automatique" ? "Automatique" : "Manuelle"}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-asphalt-500">
              Caractéristiques
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-asphalt-700">
              {vehicle.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <IconCheck className="h-4 w-4 text-route-500" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-asphalt-500">
              Options disponibles
            </h2>
            <div className="mt-3 grid gap-2">
              {options.map((opt) => {
                const Icon = OPTION_ICONS[opt.icon] ?? IconShield;
                return (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between rounded-lg border border-asphalt-700/10 bg-white px-4 py-2.5"
                  >
                    <span className="flex items-center gap-2 text-sm text-asphalt-700">
                      <Icon className="h-4 w-4 text-signal-600" />
                      {opt.name}
                    </span>
                    <span className="text-sm font-semibold text-asphalt-900">
                      +{formatPrice(opt.pricePerDay)}/j
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between rounded-xl2 bg-asphalt-950 p-6 text-mist-50">
            <div>
              <p className="text-xs uppercase tracking-wide text-mist-200/60">
                À partir de
              </p>
              <p className="font-display text-3xl font-bold">
                {formatPrice(vehicle.pricePerDay)}
                <span className="text-base font-medium text-mist-200/70">
                  {" "}
                  / jour
                </span>
              </p>
            </div>
            {vehicle.available ? (
              <Link
                href={`/reservation/${vehicle.id}`}
                className="focus-ring rounded-full bg-signal-500 px-6 py-3 text-sm font-semibold text-asphalt-950 transition hover:bg-signal-400"
              >
                Réserver ce véhicule
              </Link>
            ) : (
              <span className="rounded-full bg-mist-50/10 px-6 py-3 text-sm font-semibold text-mist-200/60">
                Indisponible
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}