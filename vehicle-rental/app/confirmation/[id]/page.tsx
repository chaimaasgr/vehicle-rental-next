import Link from "next/link";
import { notFound } from "next/navigation";
import { dataProvider } from "@/lib/data-provider";
import { formatDate, formatPrice } from "@/lib/pricing";
import { IconCheck } from "@/components/icons";

export default async function ConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const reservation = await dataProvider.getReservationById(params.id);
  if (!reservation) notFound();

  const vehicle = await dataProvider.getVehicleById(reservation.vehicleId);
  const allOptions = await dataProvider.getOptionsByIds(reservation.optionIds);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-route-500/10 text-route-600">
          <IconCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold text-asphalt-900">
          Réservation confirmée
        </h1>
        <p className="mt-2 text-asphalt-600">
          Merci {reservation.customer.fullName.split(" ")[0]}, votre
          réservation simulée a bien été enregistrée.
        </p>
        <p className="mt-4 rounded-full bg-asphalt-900 px-5 py-2 font-display text-sm font-semibold text-mist-50">
          N° {reservation.reservationNumber}
        </p>
      </div>

      <div className="mt-10 rounded-xl2 border border-asphalt-700/10 bg-white p-6 shadow-card">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-asphalt-500">
          Véhicule
        </h2>
        <p className="mt-2 font-display text-xl font-semibold text-asphalt-900">
          {vehicle ? `${vehicle.brand} ${vehicle.model}` : "—"}
        </p>

        <div className="route-line my-5" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
              Date de début
            </p>
            <p className="mt-1 text-sm text-asphalt-900">
              {formatDate(reservation.startDate)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
              Date de fin
            </p>
            <p className="mt-1 text-sm text-asphalt-900">
              {formatDate(reservation.endDate)}
            </p>
          </div>
        </div>

        {allOptions.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
              Options sélectionnées
            </p>
            <ul className="mt-2 space-y-1 text-sm text-asphalt-900">
              {allOptions.map((o) => (
                <li key={o.id}>• {o.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="route-line my-5" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-asphalt-500">
            Informations client
          </p>
          <p className="mt-1 text-sm text-asphalt-900">
            {reservation.customer.fullName}
          </p>
          <p className="text-sm text-asphalt-600">
            {reservation.customer.email} · {reservation.customer.phone}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between rounded-xl bg-asphalt-950 p-5 text-mist-50">
          <span className="font-display text-sm font-semibold uppercase tracking-wide text-mist-200/70">
            Total ({reservation.days} jour{reservation.days > 1 ? "s" : ""})
          </span>
          <span className="font-display text-2xl font-bold">
            {formatPrice(reservation.total)}
          </span>
        </div>
      </div>

      <div className="mt-10 flex justify-center gap-4">
        <Link
          href="/catalogue"
          className="focus-ring rounded-full bg-asphalt-900 px-6 py-3 text-sm font-semibold text-mist-50 hover:bg-signal-500 hover:text-asphalt-950"
        >
          Retour au catalogue
        </Link>
        <Link
          href="/"
          className="focus-ring rounded-full border border-asphalt-700/15 px-6 py-3 text-sm font-semibold text-asphalt-700 hover:border-asphalt-900"
        >
          Accueil
        </Link>
      </div>
    </section>
  );
}
