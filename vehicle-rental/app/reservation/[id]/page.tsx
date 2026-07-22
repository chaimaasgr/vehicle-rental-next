import Link from "next/link";
import { notFound } from "next/navigation";
import { dataProvider } from "@/lib/data-provider";
import { ReservationForm } from "./ReservationForm";

export default async function ReservationPage({
  params,
}: {
  params: { id: string };
}) {
  const vehicle = await dataProvider.getVehicleById(params.id);
  if (!vehicle) notFound();
  if (!vehicle.available) notFound();

  const options = await dataProvider.getOptions();

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Link
        href={`/vehicules/${vehicle.id}`}
        className="focus-ring rounded text-sm font-medium text-asphalt-600 hover:text-asphalt-900"
      >
        ← Retour au véhicule
      </Link>

      <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-signal-600">
        Réservation
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-asphalt-900">
        {vehicle.brand} {vehicle.model}
      </h1>
      <p className="mt-2 max-w-2xl text-asphalt-600">
        Choisissez vos dates, vos options, puis renseignez vos informations
        pour confirmer votre réservation simulée.
      </p>

      <div className="mt-10">
        <ReservationForm vehicle={vehicle} options={options} />
      </div>
    </section>
  );
}
